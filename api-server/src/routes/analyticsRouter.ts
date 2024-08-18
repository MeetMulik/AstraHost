import { Router } from 'express';
import { AnalyticsController } from '../controllers/analyticsController';
import { ClickHouseService } from '../clients/ClickHouseClient';

const analyticsRouter = Router();
const clickHouseService = ClickHouseService.getInstance();
const analyticsController = new AnalyticsController(clickHouseService);

analyticsRouter.post('/', analyticsController.insertAnalytics);
analyticsRouter.get('/daily-visitors/:projectId', analyticsController.getDailyVisitorCount);
analyticsRouter.get('/total-visits/:projectId', analyticsController.getTotalVisits);
analyticsRouter.get('/url-views/:projectId', analyticsController.getUrlWiseViews);
analyticsRouter.get('/browser-stats/:projectId', analyticsController.getBrowserStats);
analyticsRouter.get('/processing-stats/:projectId', analyticsController.getProcessingStats);
analyticsRouter.get('/total-views', analyticsController.getTotalViews);

export default analyticsRouter;