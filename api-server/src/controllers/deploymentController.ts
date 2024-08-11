import { Request, Response, NextFunction } from 'express';
import { deployProjectSchema, updateDeploymentStatusSchema } from '../schemas/deploymentSchema';
import { DeploymentService } from '../services/deploymentService';
import { DeploymentStatus } from '@prisma/client';

export class DeploymentController {
    private deploymentService: DeploymentService;

    constructor(deploymentService: DeploymentService) {
        this.deploymentService = deploymentService;
    }

    deployProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const validationResult = deployProjectSchema.safeParse(req.body);

        if (!validationResult.success) {
            res.status(400).json({ message: 'Invalid input', errors: validationResult.error.errors });
            return;
        }

        try {
            const deployment = await this.deploymentService.deployProjectService(validationResult.data);
            res.status(201).json(deployment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getDeploymentStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { deploymentId } = req.params;

        try {
            const deployment = await this.deploymentService.getDeploymentStatusService(deploymentId);
            if (!deployment) {
                res.status(404).json({ message: 'Deployment not found' });
                return;
            }
            res.status(200).json(deployment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getDeploymentHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { projectId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        try {
            const history = await this.deploymentService.getDeploymentHistoryService(projectId, page, limit);
            res.status(200).json(history);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    updateDeploymentStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { deploymentId } = req.params;
        const validationResult = updateDeploymentStatusSchema.safeParse(req.body);

        if (!validationResult.success) {
            res.status(400).json({ message: 'Invalid input', errors: validationResult.error.errors });
            return;
        }

        try {
            const updatedDeployment = await this.deploymentService.updateDeploymentStatusService(
                deploymentId,
                validationResult.data.status as DeploymentStatus
            );
            res.status(200).json(updatedDeployment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getLatestDeployment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { projectId } = req.params;
    
        try {
            const latestDeployment = await this.deploymentService.getLatestDeploymentService(projectId);
            if (!latestDeployment) {
                res.status(200).json({
                    message: 'No deployments found for this project',
                    data: null
                });
            } else {
                res.status(200).json({
                    message: 'Deployment found',
                    data: latestDeployment
                });
            }
        } catch (error) {
            console.error('Error fetching latest deployment:', error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
}