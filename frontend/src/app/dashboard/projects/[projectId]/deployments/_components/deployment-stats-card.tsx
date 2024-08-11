import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useMemo } from "react";
import { formatDuration, intervalToDuration } from "date-fns";

type Deployment = {
  deploymentId: string;
  deploymentDescription: string | null;
  projectId: string;
  deploymentUrl: string | null;
  deploymentStatus: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  deployments: Deployment[];
};

const DeploymentStatsCard = ({ deployments }: Props) => {
  const totalDeployments = deployments.length;

  const successfulDeployments = deployments.filter(
    (deployment) => deployment.deploymentStatus === "READY"
  ).length;

  const failedDeployments = deployments.filter(
    (deployment) => deployment.deploymentStatus === "FAILED"
  ).length;

  const avgDeploymentTime = useMemo(() => {
    if (totalDeployments === 0) return 0;

    const totalDuration = deployments.reduce((acc, deployment) => {
      const start = new Date(deployment.createdAt).getTime();
      const end = new Date(deployment.updatedAt).getTime();
      return acc + (end - start);
    }, 0);

    return totalDuration / totalDeployments / 1000; // Convert to seconds
  }, [deployments, totalDeployments]);

  const formattedAvgDeploymentTime = formatDuration(
    intervalToDuration({ start: 0, end: avgDeploymentTime * 1000 })
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 px-6 py-4">
        <h2 className="text-lg font-semibold">Deployment Stats</h2>
      </CardHeader>
      <CardContent className="p-6 grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-2xl font-bold">{totalDeployments}</div>
            <div className="text-muted-foreground">Total Deployments</div>
          </div>
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-green-500">{successfulDeployments}</div>
            <div className="text-muted-foreground">Successful</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-red-500">{failedDeployments}</div>
            <div className="text-muted-foreground">Failed</div>
          </div>
          <div className="grid gap-1">
            <div className="text-2xl font-bold">{formattedAvgDeploymentTime}</div>
            <div className="text-muted-foreground">Avg. Deployment Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentStatsCard;
