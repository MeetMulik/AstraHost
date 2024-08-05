import { Request, Response } from 'express';
import { createProjectSchema } from '../schemas/projectsSchema';
import { ProjectService } from '../services/projectsService';

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response): Promise<void> => {
    const validationResult = createProjectSchema.safeParse(req.body);
    
    if (!validationResult.success) {
        res.status(400).json({ message: 'Invalid input', errors: validationResult.error.errors });
        return;
    }
    
    try {
        const project = await projectService.createProject(validationResult.data);
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
    const projectId = req.params.projectId;
    
    try {
        const project = await projectService.getProjectById(projectId);
        
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};