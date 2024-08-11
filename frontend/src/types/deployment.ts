export interface Deployment {
    deploymentId: string;
    deploymentDescription: string | null;
    projectId: string;
    deploymentUrl: string | null;
    deploymentStatus: DeploymentStatus;
    createdAt: string;
    updatedAt: string;
}

export type DeploymentStatus = 'QUEUED' | 'IN_PROGRESS' | 'READY' | 'FAILED' | 'NOT_STARTED';
