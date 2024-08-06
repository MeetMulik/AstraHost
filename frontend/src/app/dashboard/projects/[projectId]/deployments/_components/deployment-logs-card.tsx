import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisIcon, MoveHorizontalIcon, GithubIcon, EllipsisVerticalIcon } from "lucide-react";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  projectId: string;
};

const DeploymentLogsCard = (props: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Deployment Logs</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoveHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export Logs</DropdownMenuItem>
              <DropdownMenuItem>Clear Logs</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-05-01 10:30 AM</TableCell>
              <TableCell>
                <Badge variant="secondary">Successful</Badge>
              </TableCell>
              <TableCell>Deployed new feature update</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisIcon className=" h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href={`/dashboard/projects/${props.projectId}/deployments/1`}>View Details</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-28 3:15 PM</TableCell>
              <TableCell>
                <Badge variant="outline">Failed</Badge>
              </TableCell>
              <TableCell>Deployment script failed to execute</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-25 9:00 AM</TableCell>
              <TableCell>
                <Badge variant="secondary">Successful</Badge>
              </TableCell>
              <TableCell>Deployed security patch</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-22 11:45 AM</TableCell>
              <TableCell>
                <Badge variant="secondary">Successful</Badge>
              </TableCell>
              <TableCell>Deployed bug fixes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-18 2:00 PM</TableCell>
              <TableCell>
                <Badge variant="outline">Failed</Badge>
              </TableCell>
              <TableCell>Deployment timed out</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DeploymentLogsCard;
