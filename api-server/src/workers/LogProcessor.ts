import { Consumer, EachBatchPayload } from "kafkajs";
import { ClickHouseService } from "../clients/ClickHouseClient";
import { KafkaService } from "../clients/KafkaClient";
import logger from "../utils/logger";

interface LogMessage {
    log: string;
    PROJECT_ID: string;
    DEPLOYMENT_ID: string;
    timestamp: string;
}

export class LogProcessor {

    private consumer: Consumer;
    private readonly KAFKA_TOPIC: string = 'container-logs';

    constructor(
        private kafkaService: KafkaService,
        private clickHouseService: ClickHouseService
    ) {
        this.consumer = this.kafkaService.createConsumer('api-server-logs-consumer');
    }

    async start(): Promise<void> {
        try {
            console.log('Started Processing...')
            await this.consumer.connect();
            await this.consumer.subscribe({ topics: [this.KAFKA_TOPIC] })
            await this.consumer.run({
                eachBatch: async (eachBatchPayload: EachBatchPayload) => {
                    const { heartbeat, batch, resolveOffset, commitOffsetsIfNecessary } = eachBatchPayload
                    const messages = batch.messages;
                    logger.info(`Received: ${messages.length} messages`);

                    for (const message of batch.messages) {
                        if (!message.value) continue;
                        try {
                            //Retrieve individual message
                            const individualMessage = message.value.toString();
                            const { log, DEPLOYMENT_ID }: LogMessage = JSON.parse(individualMessage);
                            logger.debug(`Received log: ${log}`);

                            //push individual log to ClickHouseDB
                            const query_id = await this.clickHouseService.insertLog(DEPLOYMENT_ID, log);
                            logger.debug('query_id', query_id);

                            resolveOffset(message.offset); //marks a message as processed
                            await commitOffsetsIfNecessary(); //checks if autoCommitInterval or threshold has been reached and commits the offsets if necessary
                            await heartbeat(); //used to send heartbeat to the broker to ensure the consumer's session remains active

                        } catch (error) {
                            logger.error('Error processing message:', error);
                        }
                    }
                }
            })
        } catch (error) {
            logger.error('Failed to start log processor:', error);
        }
    }


    async stop(): Promise<void> {
        await this.consumer.disconnect();
    }
}