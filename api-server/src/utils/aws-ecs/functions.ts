import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import { Deployments } from "@prisma/client";
import config from "../../config";
import { ecsClient } from "./ecsClient";

type DeploymentWithProject = Deployments & {
    project: {
        projectId: string;
        githubUrl: string;
    };
};

export async function deployToECS(deployment: DeploymentWithProject) {
    const command = new RunTaskCommand({
        cluster: config.AWS_ECS.CLUSTER,
        taskDefinition: config.AWS_ECS.TASK_DEFINITION,
        launchType: "FARGATE",
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: "ENABLED",
                subnets: config.AWS_ECS.SUBNETS,
                securityGroups: config.AWS_ECS.SECURITY_GROUPS,
            },
        },
        overrides: {
            containerOverrides: [
                {
                    name: config.AWS_ECS.CONTAINER_NAME,
                    environment: [
                        { name: "GIT_REPOSITORY__URL", value: deployment.project.githubUrl },
                        { name: "PROJECT_ID", value: deployment.project.projectId },
                        { name: "DEPLOYMENT_ID", value: deployment.deploymentId },
                    ],
                },
            ],
        },
    });

    try {
        const response = await ecsClient.send(command);
        console.log("Task started successfully:", response);
    } catch (error) {
        console.error("Failed to start task:", error);
    }
}