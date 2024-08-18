"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Loader2 } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface ProcessingData {
  timestamp: string;
  processing_time: number;
}

const chartConfig = {
  processing_time: {
    label: "Processing Time",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ProcessingTimeCard({ projectId }: { projectId: string }) {
  const [chartData, setChartData] = useState<ProcessingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:9000/analytics/processing-stats/${projectId}`, {
          next: {
            revalidate: 3600,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ProcessingData[] = await response.json();
        // Sort data by timestamp in ascending order
        const sortedData = data.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setChartData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const averageProcessingTime = chartData.length > 0 ? chartData.reduce((sum, item) => sum + item.processing_time, 0) / chartData.length : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Time</CardTitle>
        <CardDescription>Recent processing times</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[300px] text-red-500">{error}</div>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatTimestamp}
                interval="preserveStartEnd"
                tick={{ fontSize: 10 }}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value.toFixed(2)}ms`} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Line
                dataKey="processing_time"
                type="monotone"
                stroke="var(--color-processing_time)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-processing_time)",
                  r: 3,
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={10} formatter={(value: number) => `${value.toFixed(2)}ms`} />
              </Line>
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {!isLoading && !error && (
          <>
            <div className="flex gap-2 font-medium leading-none">
              Average processing time: {averageProcessingTime.toFixed(2)}ms <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">Showing recent processing times</div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
