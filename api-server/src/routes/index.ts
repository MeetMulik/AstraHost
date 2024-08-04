import { Router } from 'express';
import { indexController } from '../controllers/indexController';
import { createProject, getProjects } from '../controllers/projectsController';

const router = Router();

router.get('/', indexController);
router.post('/projects', createProject);
router.get('/projects', getProjects);

export default router;
