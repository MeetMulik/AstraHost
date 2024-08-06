import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

type Props = {};

const DeploymentStatsCard = (props: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 px-6 py-4">
        <h2 className="text-lg font-semibold">Deployment Stats</h2>
      </CardHeader>
      <CardContent className="p-6 grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-2xl font-bold">32</div>
            <div className="text-muted-foreground">Total Deployments</div>
          </div>
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-green-500">24</div>
            <div className="text-muted-foreground">Successful</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-red-500">8</div>
            <div className="text-muted-foreground">Failed</div>
          </div>
          <div className="grid gap-1">
            <div className="text-2xl font-bold">3m 45s</div>
            <div className="text-muted-foreground">Avg. Deployment Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentStatsCard;
