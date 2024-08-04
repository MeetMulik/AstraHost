import { z } from 'zod';

export const createProjectSchema = z.object({
    projectName: z.string(),
    githubUrl: z.string().url(),
    customDomain: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
});

export type TCreateProject = z.infer<typeof createProjectSchema>;
