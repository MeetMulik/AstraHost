import { Router } from 'express';
import { indexController } from '../controllers/indexController';
import { createProject } from '../controllers/projectsController';

const router = Router();

router.get('/', indexController);
router.post('/projects', createProject);

export default router;
