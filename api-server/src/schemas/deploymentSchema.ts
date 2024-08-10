import { z } from 'zod';
import { DeploymentStatus } from '@prisma/client';

export const deployProjectSchema = z.object({
    projectId: z.string().cuid(),
    deploymentDescription: z.string().optional(),
});

export const updateDeploymentStatusSchema = z.object({
    status: z.nativeEnum(DeploymentStatus),
});