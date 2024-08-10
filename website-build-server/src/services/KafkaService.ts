import { Kafka, Producer, SASLOptions } from 'kafkajs';
import * as fs from 'fs';
import config from '../config';
import logger from '../utils/logger';
import path from 'path';

class KafkaService {
    private static instance: KafkaService;
    private kafka: Kafka;
    private producer: Producer;

    private constructor() {
        const saslOptions: SASLOptions = {
            mechanism: config.KAFKA.SASL.MECHANISM as any,
            username: config.KAFKA.SASL.USERNAME,
            password: config.KAFKA.SASL.PASSWORD
        };
        
        this.kafka = new Kafka({
            clientId: `docker-build-server-${config.DEPLOYMENT_ID}`,
            brokers: config.KAFKA.BROKERS,
            ssl: {
                ca: [fs.readFileSync(path.join(__dirname, 'kafka.pem'), 'utf-8')],
            },
            sasl: saslOptions
        });

        this.producer = this.kafka.producer();
    }

    public static getInstance(): KafkaService {
        if (!KafkaService.instance) {
            KafkaService.instance = new KafkaService();
        }
        return KafkaService.instance;
    }

    public async connect(): Promise<void> {
        await this.producer.connect();
        logger.info('Kafka producer connected');
    }

    public async disconnect(): Promise<void> {
        await this.producer.disconnect();
        logger.info('Kafka producer disconnected');
    }

    public async publishLog(log: string): Promise<void> {
        await this.producer.send({
            topic: 'container-logs',
            messages: [
                {
                    key: "log",
                    value: JSON.stringify({
                        PROJECT_ID: config.PROJECT_ID,
                        DEPLOYMENT_ID: config.DEPLOYMENT_ID,
                        log,
                        timestamp: new Date().toISOString(),
                    }),
                },
            ],
        });
        logger.debug(`Log published: ${log}`);
    }
}

export default KafkaService;