"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Project } from "@/actions/project-actions";
import AreaChartCard from "@/components/charts/area-chart-card";
import { Separator } from "@/components/ui/separator";
import VisitorChart from "./visitor-chart.card";
import BrowserChart from "./browser-chart-card";
import FileAnalyticsCard from "./file-analytics-card";
import ProcessingTimeCard from "./processing-time-card";
import ProjectSelector from "./project-selector";

type Props = {
  projects: Project[];
  initialProjectId: string;
};

const AnalyticsContent = ({ projects, initialProjectId }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId);

  useEffect(() => {
    const projectId = searchParams.get("projectId");
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  }, [searchParams]);

  const handleProjectChange = (value: string) => {
    router.push(`?projectId=${value}`);
    setSelectedProjectId(value);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
        <ProjectSelector projects={projects} selectedProjectId={selectedProjectId} onProjectChange={handleProjectChange} />
      </div>
      <Separator />
      <AreaChartCard projectId={selectedProjectId} />
      <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
        <ProcessingTimeCard projectId={selectedProjectId} />
        <FileAnalyticsCard projectId={selectedProjectId} />
      </div>
      <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
        <VisitorChart projectId={selectedProjectId} />
        <BrowserChart projectId={selectedProjectId} />
      </div>
    </>
  );
};

export default AnalyticsContent;
