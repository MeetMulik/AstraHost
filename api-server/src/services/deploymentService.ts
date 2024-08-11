import { PrismaClient, Deployments, DeploymentStatus } from '@prisma/client';
import { deployToECS } from '../utils/aws-ecs/functions';

const prisma = new PrismaClient();

export class DeploymentService {
    async deployProjectService(data: { projectId: string; deploymentDescription?: string }): Promise<Deployments | { error: string }> {
        try {
            // Check if the project exists
            const project = await prisma.projects.findUnique({
                where: { projectId: data.projectId }
            });

            if (!project) {
                return { error: "Project not found" } as { error: string };
            }

            // Check for an ongoing deployment
            const liveDeployment = await prisma.deployments.findFirst({
                where: {
                    projectId: data.projectId,
                    deploymentStatus: DeploymentStatus.IN_PROGRESS,
                },
            });

            if (liveDeployment) {
                return { error: "Deployment in progress" } as { error: string };
            }

            // Create a new deployment
            const newDeployment = await prisma.deployments.create({
                data: {
                    projectId: data.projectId,
                    deploymentDescription: data.deploymentDescription,
                    deploymentStatus: DeploymentStatus.QUEUED,
                },
            });

            if (newDeployment.deploymentId) {
                const updatedDeployment = await prisma.deployments.update({
                    where: {
                        deploymentId: newDeployment.deploymentId
                    },
                    data: {
                        deploymentStatus: DeploymentStatus.IN_PROGRESS
                    },
                    include: {
                        project: {
                            select: {
                                projectId: true,
                                githubUrl: true
                            }
                        }
                    }
                })
                await deployToECS(updatedDeployment)
            }
            return newDeployment;

        } catch (error) {
            console.error("Error in deployProjectService:", error);
            return { error: "An unexpected error occurred while creating the deployment" } as { error: string };
        }
    }

    async getDeploymentStatusService(deploymentId: string): Promise<Deployments | null> {
        return prisma.deployments.findUnique({
            where: { deploymentId },
            include: { project: true },
        });
    }

    async getDeploymentHistoryService(projectId: string, page: number, limit: number) {
        const deployments = await prisma.deployments.findMany({
            where: { projectId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: (page - 1) * limit,
        });

        const totalDeployments = await prisma.deployments.count({
            where: { projectId },
        });

        return {
            deployments,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalDeployments / limit),
                totalItems: totalDeployments,
            },
        };
    }

    async updateDeploymentStatusService(deploymentId: string, status: DeploymentStatus): Promise<Deployments> {
        return prisma.deployments.update({
            where: { deploymentId },
            data: { deploymentStatus: status },
        });
    }
}