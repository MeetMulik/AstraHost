import { Router } from 'express';
import { indexController } from '../controllers/indexController';
import projectsRouter from './projectsRouter';
import deploymentRouter from './deploymentRouter';
import logsRouter from './logsRouter';

const router = Router();

router.get('/', indexController);
router.use('/projects', projectsRouter);
router.use('/deploy', deploymentRouter);
router.use('/logs', logsRouter);

export default router;