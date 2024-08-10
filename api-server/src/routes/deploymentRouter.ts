import { Router } from 'express';
import { DeploymentController } from '../controllers/deploymentController';
import { DeploymentService } from '../services/deploymentService';

const deploymentRouter = Router();
const deploymentService = new DeploymentService();
const deploymentController = new DeploymentController(deploymentService);

deploymentRouter.post('/', deploymentController.deployProject);
deploymentRouter.get('/:deploymentId/status', deploymentController.getDeploymentStatus);
deploymentRouter.get('/history/:projectId', deploymentController.getDeploymentHistory);
deploymentRouter.patch('/:deploymentId/status', deploymentController.updateDeploymentStatus);

export default deploymentRouter;