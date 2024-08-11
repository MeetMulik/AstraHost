import { Deployment } from '@/types/deployment';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';

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