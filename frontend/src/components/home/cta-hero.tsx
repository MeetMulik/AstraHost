import React from "react";

type Props = {};

const HeroCta = (props: Props) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="features">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Elevate Your React Development</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover a curated collection of React projects that showcase the latest trends, best practices, and innovative solutions in web development.
            </p>
          </div>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Diverse Project Showcase</h3>
            <p className="text-sm text-muted-foreground">Explore a wide range of React projects, from simple demos to complex enterprise-level applications.</p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Detailed Walkthroughs</h3>
            <p className="text-sm text-muted-foreground">
              Learn from in-depth project walkthroughs, covering code structure, design patterns, and best practices.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Community-Driven</h3>
            <p className="text-sm text-muted-foreground">Engage with a vibrant community of React developers, share insights, and collaborate on projects.</p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Customizable Templates</h3>
            <p className="text-sm text-muted-foreground">Kickstart your next project with our collection of customizable React templates and boilerplates.</p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Continuous Updates</h3>
            <p className="text-sm text-muted-foreground">
              Stay ahead of the curve with regular updates to our project library, ensuring you have access to the latest React innovations.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Responsive Design</h3>
            <p className="text-sm text-muted-foreground">
              All our React projects are designed with responsiveness in mind, ensuring a seamless user experience across devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCta;
