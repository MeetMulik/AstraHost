import { Logs, LogsService } from "../services/logsService";
import { Request, Response } from 'express';
import logger from "../utils/logger";



export class LogsController {
    private logsService: LogsService;

    constructor(logsService: LogsService) {
        this.logsService = logsService;
    }

    getLogsByDeploymentId = async (req: Request, res: Response): Promise<void> => {
        try {
            const deploymentId = req.params.deploymentId;
            const logs: Logs[] = await this.logsService.getLogsByDeploymentId(deploymentId);
            res.status(200).json(logs);
        } catch (error) {
            logger.error('Error in LogsController.getLogsByDeploymentId:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}