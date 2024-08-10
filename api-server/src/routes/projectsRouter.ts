import { Router } from 'express';
import { ProjectController } from '../controllers/projectsController';
import { ProjectService } from '../services/projectsService';

const projectsRouter = Router();
const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

projectsRouter.post('/', projectController.createProject);
projectsRouter.get('/', projectController.getProjects);
projectsRouter.get('/:projectId', projectController.getProjectById);
projectsRouter.delete('/:projectId', projectController.deleteProjectById);

export default projectsRouter;