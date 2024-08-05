import { PrismaClient, Projects } from '@prisma/client';
import { TCreateProject } from '../schemas/projectsSchema';
import { generateSlug } from "random-word-slugs";

const prisma = new PrismaClient();

export class ProjectService {
    async createProject(data: TCreateProject): Promise<Projects> {
        const subdomain = generateSlug();
        return await prisma.projects.create({
            data: {
                projectName: data.projectName,
                githubUrl: data.githubUrl,
                subdomain,
                customDomain: data.customDomain || null,
                description: data.description || null,
            },
        });
    }

    async getAllProjects(): Promise<Projects[]> {
        return await prisma.projects.findMany();
    }

    async getProjectById(projectId: string): Promise<Projects | null> {
        return await prisma.projects.findUnique({
            where: { projectId },
            include: { Deployments: true }
        });
    }
}