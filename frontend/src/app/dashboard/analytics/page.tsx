import React from "react";
import { getProjects } from "@/actions/project-actions";
import AnalyticsContent from "./_components/analytics-content";

type Props = {
  searchParams: { projectId?: string };
};

const Page = async ({ searchParams }: Props) => {
  const projects = await getProjects();
  const defaultProjectId = projects[0]?.projectId || "";
  const initialProjectId = searchParams.projectId || defaultProjectId;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <AnalyticsContent projects={projects} initialProjectId={initialProjectId} />
    </main>
  );
};

export default Page;
