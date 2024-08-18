"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import axios from "axios";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { BASE_URL } from "@/utils/constants";

interface BrowserStat {
  browser: string;
  usage_count: string;
}

const chartConfig: ChartConfig = {
  usage_count: {
    label: "Usage Count",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export default function BrowserChart({ projectId }: { projectId: string }) {
  const [browserStats, setBrowserStats] = useState<BrowserStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BrowserStat[]>(`${BASE_URL}/analytics/browser-stats/${projectId}`);
        setBrowserStats(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch browser statistics");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>{error}</CardContent>
      </Card>
    );
  }

  const chartData = browserStats.map((stat) => ({
    browser: stat.browser,
    usage_count: parseInt(stat.usage_count, 10),
    fill: chartConfig[stat.browser as keyof typeof chartConfig]?.color || "hsl(var(--chart-5))",
  }));

  const totalUsage = chartData.reduce((sum, stat) => sum + stat.usage_count, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Browser Usage Statistics</CardTitle>
        <CardDescription>Project {projectId}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="usage_count" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">Total usage: {totalUsage}</div>
        <div className="leading-none text-muted-foreground">Showing browser usage statistics for the project</div>
      </CardFooter>
    </Card>
  );
}
