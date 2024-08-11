import { ClickHouseService } from "../clients/ClickHouseClient";
import logger from "../utils/logger";

export interface Logs {
    event_id: string;
    deployment_id: string;
    log: string;
    timestamp: string;
}

export class LogsService {
    private clickHouseService: ClickHouseService;

    constructor(clickHouseService: ClickHouseService) {
        this.clickHouseService = clickHouseService;
    }

    async getLogsByDeploymentId(deploymentId: string): Promise<Logs[]> {
        try {
            const result = await this.clickHouseService.client.query({
                query: `SELECT event_id, deployment_id, log, timestamp 
                        FROM log_events 
                        WHERE deployment_id = {deployment_id:String} 
                        ORDER BY timestamp ASC`,
                query_params: {
                    deployment_id: deploymentId
                },
                format: 'JSONEachRow'
            });
            const response: Logs[] = await result.json();
            return response;
        } catch (error) {
            logger.error('Error fetching logs from ClickHouse:', error);
            throw error;
        }
    }
}