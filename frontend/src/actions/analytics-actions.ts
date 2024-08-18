import { BASE_URL } from "@/utils/constants";
import axios from "axios";

interface TotalViews {
    count: string
}

export async function getTotalViews(): Promise<TotalViews | null> {
    try {
        const response = await axios.get<TotalViews[]>(`${BASE_URL}/analytics/total-views`);
        if (response.data === null) {
            console.warn('No logs data received');
            return null;
        }
        return response.data[0];
    } catch (error) {
        console.error("Error fetching logs:", error);
        return null;
    }
}