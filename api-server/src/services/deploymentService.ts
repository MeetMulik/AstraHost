import { PrismaClient, Deployments, DeploymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

export class DeploymentService {
    async deployProjectService(data: { projectId: string; deploymentDescription?: string }): Promise<Deployments> {
        return prisma.deployments.create({
            data: {
                ...data,
                deploymentStatus: DeploymentStatus.QUEUED,
            },
        });
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