import { BASE_URL } from "@/utils/constants";
import axios from "axios";

export interface Project {
    projectId: string;
    projectName: string;
    description: string;
    githubUrl: string;
    subdomain: string;
    customDomain: string | null;
    createdAt: string;
    updatedAt: string;
}

export async function getProjects(): Promise<Project[]> {
    try {
        const response = await axios.get<Project[]>(`${BASE_URL}/projects`);
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}