import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/auth";

const DashboardDropdownButton = async () => {
  const session = await auth();
  return (
    <div>
      <Avatar>
        <AvatarImage src={session && session.user && session.user.image ? session.user.image : ("" as string)} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="sr-only">Toggle user menu</span>
    </div>
  );
};

export default DashboardDropdownButton;
