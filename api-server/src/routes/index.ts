import { Router } from 'express';
import { indexController } from '../controllers/indexController';
import { ProjectController } from '../controllers/projectsController';
import { ProjectService } from '../services/projectsService';

const router = Router();

const projectService = new ProjectService();

const projectController = new ProjectController(projectService);

router.get('/', indexController);
router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getProjects);
router.get('/projects/:projectId', projectController.getProjectById);
router.delete('/projects/:projectId', projectController.deleteProjectById);

export default router;