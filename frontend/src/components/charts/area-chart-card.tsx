"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BASE_URL } from "@/utils/constants";

interface VisitorData {
  date: string;
  os: string;
  daily_visitors: string;
}

interface ChartDataPoint {
  date: string;
  visitors: number;
}

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function AreaChartCard({ projectId }: { projectId: string }) {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/analytics/daily-visitors/${projectId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: VisitorData[] = await response.json();
        
        // Process the data to aggregate visitors by date
        const processedData = data.reduce((acc, curr) => {
          const existingDate = acc.find(item => item.date === curr.date);
          if (existingDate) {
            existingDate.visitors += parseInt(curr.daily_visitors);
          } else {
            acc.push({ date: curr.date, visitors: parseInt(curr.daily_visitors) });
          }
          return acc;
        }, [] as ChartDataPoint[]);

        // Sort the data by date
        processedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);


  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Daily Unique Visitors</CardTitle>
          <CardDescription>Showing total daily visitors </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area 
              dataKey="visitors" 
              type="monotone" 
              fill="url(#fillVisitors)" 
              stroke="var(--color-visitors)" 
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}