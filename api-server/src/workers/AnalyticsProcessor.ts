import { Consumer, EachBatchPayload } from "kafkajs";
import { ClickHouseService } from "../clients/ClickHouseClient";
import { KafkaService } from "../clients/KafkaClient";
import logger from "../utils/logger";

export interface AnalyticsData {
    timestamp: string;
    project_id: string;
    url: string;
    ip_address: string;
    user_agent: string;
    referrer: string;
    country: string;
    city: string;
    device_type: string;
    browser: string;
    os: string;
    processing_time: number;
}

export class AnalyticsProcessor {
    private consumer: Consumer;
    private readonly ANALYTICS_TOPIC: string = 'page-views';

    constructor(
        private kafkaService: KafkaService,
        private clickHouseService: ClickHouseService
    ) {
        this.consumer = this.kafkaService.createConsumer('analytics-processor-consumer');
    }

    async start(): Promise<void> {
        try {
            console.log('Started Processing Analytics...');
            await this.consumer.connect();
            await this.consumer.subscribe({ topics: [this.ANALYTICS_TOPIC] });
            await this.consumer.run({
                eachBatch: async (eachBatchPayload: EachBatchPayload) => {
                    const { heartbeat, batch, resolveOffset, commitOffsetsIfNecessary } = eachBatchPayload;
                    const messages = batch.messages;
                    logger.info(`Received: ${messages.length} analytics messages`);

                    for (const message of batch.messages) {
                        if (!message.value) continue;
                        try {
                            // Retrieve individual message
                            const individualMessage = message.value.toString();
                            const analyticsData: AnalyticsData = JSON.parse(individualMessage);
                            logger.info(`Received analytics data for project: ${analyticsData.project_id}`);
                            console.log('analyticsData', analyticsData);

                            // Push analytics data to ClickHouseDB
                            const query_id = await this.clickHouseService.insertAnalytics(analyticsData);
                            logger.info('Analytics insertion query_id', query_id);

                            resolveOffset(message.offset); // marks a message as processed
                            await commitOffsetsIfNecessary(); // checks if autoCommitInterval or threshold has been reached and commits the offsets if necessary
                            await heartbeat(); // used to send heartbeat to the broker to ensure the consumer's session remains active

                        } catch (error) {
                            logger.error('Error processing analytics message:', error);
                        }
                    }
                }
            });
        } catch (error) {
            logger.error('Failed to start analytics processor:', error);
        }
    }

    async stop(): Promise<void> {
        await this.consumer.disconnect();
    }
}