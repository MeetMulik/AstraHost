import { Router } from 'express';
import { indexController } from '../controllers/indexController';
import projectsRouter from './projectsRouter';
import deploymentRouter from './deploymentRouter';
import logsRouter from './logsRouter';
import analyticsRouter from './analyticsRouter';

const router = Router();

router.get('/', indexController);
router.use('/projects', projectsRouter);
router.use('/deploy', deploymentRouter);
router.use('/logs', logsRouter);
router.use('/analytics', analyticsRouter);

export default router;