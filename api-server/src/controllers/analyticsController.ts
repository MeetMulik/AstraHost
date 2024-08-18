import { Request, Response } from 'express';
import { AnalyticsData } from '../workers/AnalyticsProcessor';
import { ClickHouseService } from '../clients/ClickHouseClient';
import { parseISO, isValid } from 'date-fns';
export class AnalyticsController {
    constructor(private clickHouseService: ClickHouseService) { }

    insertAnalytics = async (req: Request, res: Response) => {
        try {
            const analyticsData: AnalyticsData = req.body;
            const queryId = await this.clickHouseService.insertAnalytics(analyticsData);
            res.status(201).json({ message: 'Analytics data inserted successfully', queryId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to insert analytics data' });
        }
    };

    getDailyVisitorCount = async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params;
            const dailyVisitors = await this.clickHouseService.getDailyVisitorCount(projectId);
            res.status(200).json(dailyVisitors);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve daily visitor count' });
        }
    };

    getTotalVisits = async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params;
            const totalVisits = await this.clickHouseService.getTotalVisits(projectId);
            res.status(200).json(totalVisits);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve total visits' });
        }
    };

    getUrlWiseViews = async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params;
            const urlViews = await this.clickHouseService.getUrlWiseViews(projectId);
            res.status(200).json(urlViews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve URL-wise views' });
        }
    };

    getBrowserStats = async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params;
            const browserStats = await this.clickHouseService.getBrowserStats(projectId);
            res.status(200).json(browserStats);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve browser statistics' });
        }
    };

    getProcessingStats = async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params;
            const browserStats = await this.clickHouseService.getProcessingStats(projectId);
            res.status(200).json(browserStats);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve browser statistics' });
        }
    }

}