import { signOut } from "@/auth";
import React from "react";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
};

export default LogoutButton;
