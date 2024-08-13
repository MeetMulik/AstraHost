import React from "react";
import Link from "next/link";
import { CodepenIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../shared/mode-toggle";

type Props = {};

const Header = (props: Props) => {
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
        <ModeToggle />
        <Button className="px-5 py-2">Login</Button>
      </nav>
    </header>
  );
};

export default Header;
