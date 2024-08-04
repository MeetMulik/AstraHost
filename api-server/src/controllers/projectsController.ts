import { Request, Response } from 'express';
import { PrismaClient, Projects } from '@prisma/client';
import { ZodError } from 'zod';
import { createProjectSchema, TCreateProject } from '../schemas/projectsSchema';
import { generateSlug } from "random-word-slugs";


const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response): Promise<void> => {
    const validationResult = createProjectSchema.safeParse(req.body);

    if (!validationResult.success) {
        res.status(400).json({ message: 'Invalid input', errors: validationResult.error.errors });
        return;
    }

    try {
        const data: TCreateProject = validationResult.data;
        const subdomain = generateSlug();

        const project = await prisma.projects.create({
            data: {
                projectName: data.projectName,
                githubUrl: data.githubUrl,
                subdomain,
                customDomain: data.customDomain || null,
                description: data.description || null,
            },
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.projects.findMany();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
