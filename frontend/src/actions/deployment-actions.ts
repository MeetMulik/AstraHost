import { Deployment } from '@/types/deployment';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';


interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

interface DeploymentHistoryResponse {
    deployments: Deployment[];
    pagination: Pagination;
}

export async function getLatestDeployment(projectId: string): Promise<Deployment | null> {
    try {
        const response = await axios.get<{ message: string; data: Deployment | null }>(`${BASE_URL}/deploy/${projectId}/latest`);

        if (response.data.data === null) {
            console.warn(response.data.message);
            return null;
        }

        return response.data.data;
    } catch (error) {
        console.error("Error fetching latest deployment:", error);
        return null;
    }
}

export async function getDeploymentHistory(projectId: string): Promise<DeploymentHistoryResponse | null> {
    try {
        const response = await axios.get<{ message?: string; deployments: Deployment[]; pagination: Pagination }>(
            `${BASE_URL}/deploy/history/${projectId}`
        );

        if (!response.data.deployments || response.data.deployments.length === 0) {
            console.warn(response.data.message || "No deployment history found");
            return null;
        }

        return {
            deployments: response.data.deployments,
            pagination: response.data.pagination
        };
    } catch (error) {
        console.error("Error fetching deployment history:", error);
        return null;
    }
}