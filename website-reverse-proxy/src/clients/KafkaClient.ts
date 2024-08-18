import { Kafka, Producer, SASLOptions, CompressionTypes, Message } from "kafkajs";
import * as fs from 'fs';
import path from "path";
import logger from '../utils/logger';
import config from "../config";
import { AnalyticsData } from "../types/analytics-data";

export class KafkaProducerService {
    private static instance: KafkaProducerService;
    private kafka: Kafka;
    private producer: Producer;
    private readonly ANALYTICS_TOPIC = 'page-views';

    private constructor() {
        const saslOptions: SASLOptions = {
            mechanism: config.KAFKA.SASL.MECHANISM as any,
            username: config.KAFKA.SASL.USERNAME,
            password: config.KAFKA.SASL.PASSWORD
        };

        this.kafka = new Kafka({
            clientId: `api-server-producer`,
            brokers: config.KAFKA.BROKERS,
            ssl: {
                ca: fs.readFileSync(path.resolve(__dirname, '..', 'certificates', 'kafka.pem'), 'utf-8'),
            },
            sasl: saslOptions
        });

        this.producer = this.kafka.producer({
            allowAutoTopicCreation: false,
            transactionTimeout: 30000
        });
    }

    public static getInstance(): KafkaProducerService {
        if (!KafkaProducerService.instance) {
            KafkaProducerService.instance = new KafkaProducerService();
        }
        return KafkaProducerService.instance;
    }

    public async connect(): Promise<void> {
        try {
            await this.producer.connect();
            logger.info('Kafka producer connected successfully');
        } catch (error) {
            logger.error('Failed to connect Kafka producer', error);
            throw error;
        }
    }

    public async sendAnalyticsData(analyticsData: AnalyticsData): Promise<void> {

        try {
            const message: Message = {
                value: JSON.stringify(analyticsData),
                timestamp: Date.now().toString()
            };

            await this.producer.send({
                topic: this.ANALYTICS_TOPIC,
                compression: CompressionTypes.GZIP,
                messages: [message],
            });

            logger.info('Analytics data sent to Kafka successfully', { topic: this.ANALYTICS_TOPIC });
        } catch (error) {
            logger.error('Failed to send analytics data to Kafka', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.producer.disconnect();
            logger.info('Kafka producer disconnected successfully');
        } catch (error) {
            logger.error('Failed to disconnect Kafka producer', error);
            throw error;
        }
    }

}
