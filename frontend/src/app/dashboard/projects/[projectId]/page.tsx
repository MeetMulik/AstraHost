import { getLatestDeployment } from "@/actions/deployment-actions";
import { getProjectById } from "@/actions/project-actions";
import { DeployButton } from "@/components/shared/deploy-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpRight, ChevronDown, EllipsisIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: {
    projectId: string;
  };
};

const page = async ({ params }: Props) => {
  const project = await getProjectById(params.projectId);
  const latestDeployment = await getLatestDeployment(params.projectId);

  const updatedAt = latestDeployment?.updatedAt;
  const timeAgo = updatedAt ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true }) : "Unknown time";

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold md:text-3xl text-foreground">{`${project?.projectName}`}</h1>
        </div>
        <div className="hidden items-center space-x-2 md:flex">
          <Link href={project!.githubUrl}>
            <Button variant="secondary">
              <GithubIcon className="h-4 w-4 ml-1" />
              Repository
            </Button>
          </Link>
          {latestDeployment ? (
            <Link href={`http://${project?.subdomain}.localhost:8001`}>
              <Button variant="default">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Visit
              </Button>
            </Link>
          ) : (
            <Button variant="default" disabled>
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Visit
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisIcon className=" h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={project!.githubUrl}>
                <DropdownMenuItem>
                  Repository
                  <GithubIcon className="h-4 w-4 ml-1" />
                </DropdownMenuItem>
              </Link>
              {latestDeployment ? (
                <Link href={`http://${project?.subdomain}.localhost:8001`} passHref>
                  <DropdownMenuItem>
                    Visit
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </DropdownMenuItem>
                </Link>
              ) : (
                <DropdownMenuItem disabled>
                  Visit
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-foreground">{`Production Deployment`}</h1>
          <p className="text-sm text-foreground/60">The deployment that is available to your visitors.</p>
        </div>
        <div className="hidden md:flex space-x-4">
          <Button variant="outline">
            <Link href={`/dashboard/projects/${params.projectId}/deployments/${latestDeployment?.deploymentId}`}>Build Logs</Link>
          </Button>
          <Button variant="outline">
            <Link href={`/dashboard/projects/${project?.projectId}/deployments`}>View Previous Deployments</Link>
          </Button>
          <DeployButton latestDeployment={latestDeployment} projectId={params.projectId} />
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Build Logs</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/dashboard/projects/${project?.projectId}/deployments`}>View Previous Deployments</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>{latestDeployment ? "Redeploy" : "Deploy"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="bg-muted/40 text-foreground">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border-foreground/20 rounded-md overflow-hidden">
              <h3 className="text-lg font-semibold mb-2">{project?.projectName}</h3>
              {latestDeployment?.deploymentStatus === "READY" ? (
                <div className="relative w-full h-64 border border-foreground/20 rounded-md overflow-hidden">
                  <a
                    href={`http://${project?.subdomain}.localhost:8001`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ zIndex: 10 }}
                  >
                    <span className="sr-only">Open in new tab</span>
                  </a>
                  <iframe
                    src={`http://${project?.subdomain}.localhost:8001`}
                    title="Embedded Webpage"
                    className="absolute top-0 left-0 w-full h-full border-none pointer-events-none"
                    sandbox="allow-scripts allow-same-origin"
                    style={{
                      transform: "scale(0.4)",
                      transformOrigin: "0 0",
                      width: "250%",
                      height: "250%",
                    }}
                  ></iframe>
                </div>
              ) : (
                <a href={`http://${project?.subdomain}.localhost:8001`} target="_blank" rel="noopener noreferrer">
                  <AspectRatio
                    ratio={16 / 9}
                    className="w-full border border-foreground/20 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <p className="text-sm text-gray-500">Deployment not ready</p>
                  </AspectRatio>
                </a>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Deployment</h3>
              <p className="text-sm mb-2">{project?.projectName || "image-gallery-e7d9kqkcs-meetmuliks-projects.vercel.app"}</p>

              <h4 className="text-sm font-semibold mt-4 mb-2">Domains</h4>
              {latestDeployment ? (
                <Link href={`http://${project?.subdomain}.localhost:8001`}>
                  <p className="text-sm flex items-center">
                    <span className="border-b-2 border-white">{project?.subdomain || ""}</span>
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                    <span className="ml-2 text-foreground/60">+2</span>
                  </p>
                </Link>
              ) : (
                <p className="text-sm text-foreground/60">Project not yet deployed</p>
              )}

              <h4 className="text-sm font-semibold mt-4">Deployment Status</h4>
              {latestDeployment ? (
                <div className="mt-2 flex items-center">
                  <span
                    className={`rounded-full h-2 w-2 mr-2 ${
                      latestDeployment.deploymentStatus === "READY"
                        ? "bg-green-500"
                        : latestDeployment.deploymentStatus === "IN_PROGRESS"
                        ? "bg-blue-500"
                        : latestDeployment.deploymentStatus === "QUEUED"
                        ? "bg-yellow-500"
                        : latestDeployment.deploymentStatus === "FAILED"
                        ? "bg-red-500"
                        : latestDeployment.deploymentStatus === "NOT_STARTED"
                        ? "bg-gray-500"
                        : "bg-gray-300"
                    }`}
                  ></span>
                  <span className="text-sm font-semibold">{latestDeployment.deploymentStatus}</span>
                  <span className="text-sm text-foreground/60 ml-2">{`${timeAgo} by Name`}</span>
                </div>
              ) : (
                <p className="mt-2 text-sm text-foreground/60">No deployment status available</p>
              )}

              <h4 className="text-sm font-semibold mt-4 mb-1">Description</h4>
              <p className="text-sm">{latestDeployment?.deploymentDescription}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-background text-foreground p-4 rounded-md flex justify-between items-center">
        <p className="text-sm">To update your Production Deployment, push to the "main" branch.</p>
        <Button variant="outline" size="sm">
          Learn More
        </Button>
      </div>
    </main>
  );
};

export default page;
