import { ClickHouseClient, createClient } from '@clickhouse/client';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';
import { AnalyticsData } from '../workers/AnalyticsProcessor';

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

    async insertAnalytics(analyticsData: AnalyticsData): Promise<string> {
        try {
            const formattedAnalyticsData = {
                ...analyticsData,
                timestamp: new Date(analyticsData.timestamp).toISOString().replace('Z', ''),
            };

            const { query_id } = await this.client.insert({
                table: 'analytics_data',
                values: [formattedAnalyticsData],
                format: 'JSONEachRow',
            });

            return query_id;
        } catch (error) {
            logger.error('Error inserting analytics data to ClickHouse:', error);
            throw error;
        }
    }

    async getProjectAnalytics(projectId: string, startDate: string, endDate: string) {
        try {
            const query = `
                SELECT *
                FROM analytics_data
                WHERE project_id = {projectId:String}
                    AND timestamp BETWEEN {startDate:DateTime} AND {endDate:DateTime}
                ORDER BY timestamp
            `;
            const result = await this.client.query({
                query,
                format: 'JSONEachRow',
                query_params: {
                    projectId,
                    startDate,
                    endDate,
                },
            });
            return result.json();
        } catch (error) {
            logger.error('Error retrieving project analytics from ClickHouse:', error);
            throw error;
        }
    }

    async getDailyVisitorCount(projectId: string): Promise<{ date: string; daily_visitors: number }[]> {
        try {
            const result = await this.client.query({
                query: `
                    SELECT 
                        toDate(timestamp) AS date, 
                        os, 
                        count(DISTINCT ip_address) AS daily_visitors
                    FROM 
                        analytics_data
                    WHERE 
                        project_id = {project_id:String}
                    GROUP BY 
                        date, os
                    ORDER BY 
                        date DESC
                `,
                query_params: { project_id: projectId },
                format: 'JSONEachRow',
            });

            const response: { date: string; daily_visitors: number }[] = await result.json();
            return response;
        } catch (error) {
            logger.error('Error fetching daily visitor count from ClickHouse:', error);
            throw error;
        }
    }

    async getTotalVisits(projectId: string): Promise<{ total_visits: number }> {
        try {
            const result = await this.client.query({
                query: `
                    SELECT count(*) AS total_visits
                    FROM analytics_data
                    WHERE project_id = {project_id:String}
                `,
                query_params: { project_id: projectId },
                format: 'JSONEachRow',
            });

            const [response]: { total_visits: number }[] = await result.json();
            return response;
        } catch (error) {
            logger.error('Error fetching total visits from ClickHouse:', error);
            throw error;
        }
    }

    async getUrlWiseViews(projectId: string): Promise<{ url: string; views: number }[]> {
        try {
            const result = await this.client.query({
                query: `
                    SELECT url, count(*) AS views
                    FROM analytics_data
                    WHERE project_id = {project_id:String}
                    GROUP BY url
                    ORDER BY views DESC
                `,
                query_params: { project_id: projectId },
                format: 'JSONEachRow',
            });

            const response: { url: string; views: number }[] = await result.json();
            return response;
        } catch (error) {
            logger.error('Error fetching URL-wise views from ClickHouse:', error);
            throw error;
        }
    }

    async getBrowserStats(projectId: string): Promise<{ browser: string; usage_count: number }[]> {
        try {
            const result = await this.client.query({
                query: `
                    SELECT browser, count(*) AS usage_count
                    FROM analytics_data
                    WHERE project_id = {project_id:String}
                    GROUP BY browser
                    ORDER BY usage_count DESC
                `,
                query_params: { project_id: projectId },
                format: 'JSONEachRow',
            });

            const response: { browser: string; usage_count: number }[] = await result.json();
            return response;
        } catch (error) {
            logger.error('Error fetching browser stats from ClickHouse:', error);
            throw error;
        }
    }

    async getProcessingStats(projectId: string): Promise<{ timestamp: string; processing_time: number }[]> {
        try {
            const result = await this.client.query({
                query: `
                    SELECT timestamp, processing_time
                    FROM (
                        SELECT 
                            timestamp, 
                            processing_time, 
                            row_number() OVER (ORDER BY timestamp DESC) AS row_num
                        FROM analytics_data
                        WHERE project_id = {project_id:String}
                    )
                    WHERE row_num % 10 = 1
                    ORDER BY timestamp DESC
                    LIMIT 10
                `,
                query_params: { project_id: projectId },
                format: 'JSONEachRow',
            });
    
            const response: { timestamp: string; processing_time: number }[] = await result.json();
            return response;
        } catch (error) {
            logger.error('Error fetching processing times from ClickHouse:', error);
            throw error;
        }
    }
    

}