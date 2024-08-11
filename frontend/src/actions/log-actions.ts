import { BASE_URL } from "@/utils/constants";
import axios from "axios";

export type Log = {
    event_id: string;
    deployment_id: string;
    log: string;
    timestamp: string;
};

export async function getLogs(deploymentId: string): Promise<Log[]> {
    try {
        const response = await axios.get<Log[]>(`${BASE_URL}/logs/${deploymentId}`);
        if (response.data === null) {
            console.warn('No logs data received');
            return [];
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching logs:", error);
        return [];
    }
}