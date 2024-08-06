import { Request, Response, NextFunction } from 'express';
import { createProjectSchema } from '../schemas/projectsSchema';
import { ProjectService } from '../services/projectsService';

export class ProjectController {
    private projectService: ProjectService;

    constructor(projectService: ProjectService) {
        this.projectService = projectService;
    }

    createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const validationResult = createProjectSchema.safeParse(req.body);

        if (!validationResult.success) {
            res.status(400).json({ message: 'Invalid input', errors: validationResult.error.errors });
            return;
        }

        try {
            const project = await this.projectService.createProjectService(validationResult.data);
            res.status(201).json(project);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const projects = await this.projectService.getAllProjectsService();
            res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const projectId = req.params.projectId;

        try {
            const project = await this.projectService.getProjectByIdService(projectId);

            if (!project) {
                res.status(404).json({ message: 'Project not found' });
                return;
            }

            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    deleteProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const projectId = req.params.projectId;

        try {
            const project = await this.projectService.deleteProjectByIdService(projectId);

            if (!project) {
                res.status(404).json({ message: 'Project not found' });
                return;
            }

            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}