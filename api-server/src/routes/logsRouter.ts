import { Router } from 'express';
import { LogsController } from '../controllers/logsController';
import { ClickHouseService } from '../clients/ClickHouseClient';
import { LogsService } from '../services/logsService';


const clickHouseService = ClickHouseService.getInstance();
const logsService = new LogsService(clickHouseService);
const logsController = new LogsController(logsService);

const logsRouter = Router();

logsRouter.get("/:deploymentId", logsController.getLogsByDeploymentId)

export default logsRouter;