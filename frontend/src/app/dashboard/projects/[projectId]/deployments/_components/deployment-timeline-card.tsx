import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

type Props = {};

const DeploymentTimelineCard = (props: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 px-6 py-4">
        <h2 className="text-lg font-semibold">Deployment Timeline</h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 relative pl-6 after:left-0 grid gap-10">
          <div className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
            <div className="font-medium">2023-05-01 10:30 AM</div>
            <div className="text-muted-foreground">Deployed new feature update</div>
          </div>
          <div className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-red-500 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
            <div className="font-medium">2023-04-28 3:15 PM</div>
            <div className="text-muted-foreground">Deployment script failed to execute</div>
          </div>
          <div className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
            <div className="font-medium">2023-04-25 9:00 AM</div>
            <div className="text-muted-foreground">Deployed security patch</div>
          </div>
          <div className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
            <div className="font-medium">2023-04-22 11:45 AM</div>
            <div className="text-muted-foreground">Deployed bug fixes</div>
          </div>
          <div className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-red-500 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
            <div className="font-medium">2023-04-18 2:00 PM</div>
            <div className="text-muted-foreground">Deployment timed out</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentTimelineCard;
