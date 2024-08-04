import { Button } from "@/components/ui/button";
import React from "react";
import ProjectTable from "./_components/project-table";

type Props = {};

const page = (props: Props) => {
  const projects = [1];
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {projects.length === 0 && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">You have no projects</h3>
            <p className="text-sm text-muted-foreground">You can start selling as soon as you add a product.</p>
            <Button className="mt-4">Add Product</Button>
          </div>
        </div>
      )}
      {projects.length > 0 && <ProjectTable />}
    </main>
  );
};

export default page;
