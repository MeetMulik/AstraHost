import React from "react";
import Link from "next/link";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y p-16">
      <div className="container px-4 md:px-6 space-y-12 xl:space-y-20 items-center justify-center">
        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
          <div>
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Elevate Your React Projects with AstraHost
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Transform your GitHub repositories into live websites effortlessly. Explore and deploy React.js and Next.js projects with just a paste and click,
              and let your web development creativity soar.
            </p>
            <div className="space-x-4 mt-6">
              <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Explore Projects
              </Link>
              <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <img src="/hero.jpg" width="550" height="400" alt="Hero" className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
