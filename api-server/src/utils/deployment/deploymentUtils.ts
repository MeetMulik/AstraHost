import { DeploymentStatus, PrismaClient } from '@prisma/client';
import logger from '../logger';

const prisma = new PrismaClient();

export async function updateDeploymentStatus(deploymentId: string, status: DeploymentStatus): Promise<void> {
    try {
        const updatedDeployment = await prisma.deployments.update({
            where: { deploymentId },
            data: { deploymentStatus: status },
        });
        console.log('updatedDeployment', updatedDeployment);

        logger.info(`Deployment ${deploymentId} marked as ${status}.`);
    } catch (error) {
        logger.error(`Failed to update deployment ${deploymentId} to ${status}:`, error);
    }
}
