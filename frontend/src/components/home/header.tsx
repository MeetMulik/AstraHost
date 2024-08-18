import React from "react";
import Link from "next/link";
import { CodepenIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../shared/mode-toggle";
import SignIn from "../auth/sign-in";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import LogoutButton from "../shared/logout-button";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="#" className="flex items-center justify-center space-x-3" prefetch={false}>
        <CodepenIcon className="h-6 w-6" />
        <h1 className="text-foreground font-semibold text-lg">AstraHost</h1>
      </Link>
      <nav className="ml-auto gap-4 sm:gap-6 flex items-center ">
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Features
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Projects
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Pricing
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
        <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Dashboard
        </Link>
        <ModeToggle />
        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={session && session.user && session.user.image ? session.user.image : ("" as string)} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!session && <SignIn />}
      </nav>
    </header>
  );
};

export default Header;
