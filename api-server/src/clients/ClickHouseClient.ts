import { ClickHouseClient, createClient } from '@clickhouse/client';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';

export class ClickHouseService {
    private static instance: ClickHouseService;
    public client: ClickHouseClient;

    private constructor() {
        this.client = createClient({
            host: process.env.CLICKHOUSE_HOST,
            database: 'default',
            username: process.env.CLICKHOUSE_USERNAME,
            password: process.env.CLICKHOUSE_PASSWORD,
        });
    }

    public static getInstance(): ClickHouseService {
        if (!ClickHouseService.instance) {
            ClickHouseService.instance = new ClickHouseService();
        }
        return ClickHouseService.instance;
    }

    async insertLog(deploymentId: string, log: string): Promise<string> {
        try {
            const { query_id } = await this.client.insert({
                table: 'log_events',
                values: [{
                    event_id: uuidv4(),
                    deployment_id: deploymentId,
                    log,
                    timestamp: new Date().toISOString(),
                }],
                format: 'JSONEachRow',
            });
            return query_id;
        } catch (error) {
            logger.error('Error inserting log to ClickHouse:', error);
            throw error;
        }
    }
}