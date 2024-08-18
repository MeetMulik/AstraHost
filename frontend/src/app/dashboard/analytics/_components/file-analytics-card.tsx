"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface UrlView {
  url: string;
  views: string;
}

export default function FileAnalyticsCard({ projectId }: { projectId: string }) {
  const [chartData, setChartData] = useState<UrlView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UrlView[]>(`${BASE_URL}/analytics/url-views/${projectId}`);
        setChartData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch analytics data");
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

  const chartConfig: ChartConfig = {
    views: {
      label: "Views",
    },
    ...Object.fromEntries(
      chartData.map((item, index) => [
        item.url,
        {
          label: `${item.url}`,
          color: `hsl(var(--chart-${(index % 5) + 1}))`,
        },
      ])
    ),
  };

  const formattedChartData = chartData.map((item, index) => ({
    url: item.url,
    views: parseInt(item.views, 10),
    fill: chartConfig[item.url]?.color || `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>URL Views Analytics</CardTitle>
        <CardDescription>Most viewed URLs for project {projectId}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={formattedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="url" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => chartConfig[value]?.label || value} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="views"
              strokeWidth={2}
              radius={8}
              activeBar={({ ...props }) => {
                return <Rectangle {...props} fillOpacity={0.8} stroke={props.fill} strokeDasharray={4} strokeDashoffset={4} />;
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Top URL: {chartData[0]?.url} with {chartData[0]?.views} views
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing top {chartData.length} URLs by view count</div>
      </CardFooter>
    </Card>
  );
}
