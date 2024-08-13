import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const HeroExplore = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="projects">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Our React Projects</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse through our diverse collection of React projects, each designed to inspire and empower your web development journey.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 lg:grid-cols-3 items-center justify-center gap-8 lg:gap-12">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>React Dashboard</CardTitle>
              <CardDescription>
                A feature-rich dashboard built with React, showcasing advanced data visualization and user management capabilities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CircleDotIcon className="w-3 h-3 mr-1" />
                  React
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-3 h-3 mr-1" />
                  12k
                </div>
                <div>Updated May 2023</div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Explore Project
              </Link>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>React E-commerce</CardTitle>
              <CardDescription>
                A fully-featured e-commerce platform built with React, showcasing advanced shopping cart, checkout, and order management features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CircleDotIcon className="w-3 h-3 mr-1" />
                  React
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-3 h-3 mr-1" />
                  18k
                </div>
                <div>Updated June 2023</div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Explore Project
              </Link>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>React Portfolio</CardTitle>
              <CardDescription>A modern and responsive portfolio website built with React, showcasing a clean design and interactive features.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CircleDotIcon className="w-3 h-3 mr-1" />
                  React
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-3 h-3 mr-1" />
                  8k
                </div>
                <div>Updated April 2023</div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Explore Project
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

function CircleDotIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function CodepenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" x2="12" y1="22" y2="15.5" />
      <polyline points="22 8.5 12 15.5 2 8.5" />
      <polyline points="2 15.5 12 8.5 22 15.5" />
      <line x1="12" x2="12" y1="2" y2="8.5" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default HeroExplore;
