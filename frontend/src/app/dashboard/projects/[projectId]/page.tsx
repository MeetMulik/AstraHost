import { getProjectById } from "@/actions/project-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpRight, ChevronDown, EllipsisIcon, GithubIcon } from "lucide-react";
import React from "react";

type Props = {
  params: {
    projectId: string;
  };
};

const page = async ({ params }: Props) => {
  const project = await getProjectById(params.projectId);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold md:text-3xl text-foreground">{`${project?.projectName}`}</h1>
        </div>
        <div className="hidden items-center space-x-2 md:flex">
          <Button variant="secondary">
            <GithubIcon className="h-4 w-4 mr-2" />
            Repository
          </Button>
          <Button variant="default">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Visit
          </Button>
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisIcon className=" h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                Repository
                <GithubIcon className="h-4 w-4 ml-1" />
              </DropdownMenuItem>
              <DropdownMenuItem>
                Visit
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-foreground">{`Production Deployment`}</h1>
          <p className="text-sm text-foreground/60">The deployment that is available to your visitors.</p>
        </div>
        <div className="hidden md:flex space-x-4">
          <Button variant="outline">Build Logs</Button>
          <Button variant="outline">View Previous Deployments</Button>
          <Button variant="outline">Redeploy</Button>
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
              <DropdownMenuItem>View Previous Deployments</DropdownMenuItem>
              <DropdownMenuItem>Redeploy</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="bg-muted/40 text-foreground">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-foreground/20 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Gallery</h3>
              <p className="text-sm">Please sign in to view the images.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Deployment</h3>
              <p className="text-sm mb-2">{project?.projectName || "image-gallery-e7d9kqkcs-meetmuliks-projects.vercel.app"}</p>

              <h4 className="text-sm font-semibold mt-4 mb-2">Domains</h4>
              <p className="text-sm flex items-center">
                {project?.subdomain || "image-gallery-teal-eight.vercel.app"}
                <ArrowUpRight className="h-4 w-4 ml-2" />
                <span className="ml-2 text-foreground/60">+2</span>
              </p>

              <div className="mt-4 flex items-center">
                <span className="bg-green-500 rounded-full h-2 w-2 mr-2"></span>
                <span className="text-sm font-semibold">Ready</span>
                <span className="text-sm text-foreground/60 ml-2">96d ago by MeetMulik</span>
              </div>

              <h4 className="text-sm font-semibold mt-4 mb-2">Source</h4>
              <p className="text-sm">main</p>
              <p className="text-sm">b149a89 feat: next-image setup</p>
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
