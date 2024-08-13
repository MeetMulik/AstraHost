import AreaChartCard from "@/components/charts/area-chart-card";
import { Button } from "@/components/ui/button";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="project1">Project 1</SelectItem>
            <SelectItem value="project2">Project 2</SelectItem>
            <SelectItem value="project3">Project 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <AreaChartCard />
    </main>
  );
};

export default page;
