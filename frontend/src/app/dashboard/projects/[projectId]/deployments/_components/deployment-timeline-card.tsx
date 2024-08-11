import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { format } from "date-fns";

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

const DeploymentTimelineCard = ({ deployments }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 px-6 py-4">
        <h2 className="text-lg font-semibold">Deployment Timeline</h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 relative pl-6 after:left-0 grid gap-10">
          {deployments.map((deployment) => (
            <div key={deployment.deploymentId} className="grid gap-1 text-sm relative">
              <div
                className={`aspect-square w-3 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 ${
                  deployment.deploymentStatus === "SUCCESSFUL" ? "bg-primary" : "bg-red-500"
                }`}
              />
              <div className="font-medium">{format(new Date(deployment.createdAt), "yyyy-MM-dd hh:mm a")}</div>
              <div className="text-muted-foreground">{deployment.deploymentDescription || "No description available"}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentTimelineCard;
