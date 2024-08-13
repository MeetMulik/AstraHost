import { signIn } from "@/auth";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      <Button className="px-5 py-2" type="submit">
        Login
      </Button>
    </form>
  );
}
