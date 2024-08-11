import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getLogs, Log } from "@/actions/log-actions";

type Props = {
  params: {
    projectId: string;
    deploymentId: string;
  };
};

const BuildLogs = async ({ deploymentId }: { deploymentId: string }) => {
  const logs: Log[] = await getLogs(deploymentId);

  return (
    <div className="flex flex-col items-start justify-center space-y-3">
      <div className="flex justify-between items-start flex-col ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent">
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <Logs className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">AstraHost</span>
            </Link>
            <h1 className="text-xl font-bold">Build Logs</h1>
          </div>
        </header>
      </div>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-foreground rounded-full text-xs text-background">All Logs ({logs.length})</span>
              <span className="px-2 py-1 bg-foreground rounded-full text-xs text-background">Errors (0)</span>
              <span className="px-2 py-1 bg-foreground rounded-full text-xs text-background">Warnings (0)</span>
            </div>
          </div>
          {logs.map((log) => (
            <div key={log.event_id} className="flex">
              <span className="text-foreground mr-4">{new Date(log.timestamp).toLocaleTimeString()}</span>
              <span>{log.log}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const Page = ({ params }: Props) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <BuildLogs deploymentId={params.deploymentId} />
    </main>
  );
};

export default Page;
