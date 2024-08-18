import { Button } from "@/components/ui/button";
import React from "react";
import CardOne from "./_components/card-one";
import { Separator } from "@/components/ui/separator";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>
      <Separator />
      <CardOne />
    </main>
  );
};

export default page;
