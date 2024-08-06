import { getProjectById } from "@/actions/project-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpRight, ChevronDown, EllipsisIcon, FrameIcon, GithubIcon, MoveHorizontalIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DeploymentLogsCard from "./_components/deployment-logs-card";
import DeploymentStatsCard from "./_components/deployment-stats-card";
import DeploymentTimelineCard from "./_components/deployment-timeline-card";

type Props = {
  params: {
    projectId: string;
  };
};

const page = async ({ params }: Props) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-start flex-col ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <FrameIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <h1 className="text-xl font-bold">Deployments</h1>
          </div>
        </header>
      </div>
      <div>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-0 justify-center items-center">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <DeploymentLogsCard />
            </div>
            <div className="grid gap-4">
              <DeploymentStatsCard />
              <DeploymentTimelineCard />
            </div>
          </main>
        </div>
      </div>
    </main>
  );
};

export default page;
