import { Consumer, Kafka, Producer, SASLOptions } from "kafkajs";
import config from "../config";
import * as fs from 'fs';
import path from "path";

export class KafkaService {
    private static instance: KafkaService;
    private kafka: Kafka;
    private consumer: Consumer;

    private constructor() {
        const saslOptions: SASLOptions = {
            mechanism: config.KAFKA.SASL.MECHANISM as any,
            username: config.KAFKA.SASL.USERNAME,
            password: config.KAFKA.SASL.PASSWORD
        };

        this.kafka = new Kafka({
            clientId: `api-server`,
            brokers: config.KAFKA.BROKERS,
            ssl: {
                ca: fs.readFileSync(path.resolve(__dirname, '..', 'certificates', 'kafka.pem'), 'utf-8'),

            },
            sasl: saslOptions
        });

        this.consumer = this.kafka.consumer({ groupId: "api-server-logs-consumer" });
    }

    public static getInstance(): KafkaService {
        if (!KafkaService.instance) {
            KafkaService.instance = new KafkaService();
        }
        return KafkaService.instance;
    }

    public getConsumer(): Consumer {
        return this.consumer;
    }
}
