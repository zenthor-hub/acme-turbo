import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth, getSession } from "@acme/auth";

import { Button } from "~/components/ui/button";

export async function AuthShowcase() {
  const session = await getSession();
  if (!session) {
    return (
      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            const res = await auth.api.signInSocial({
              body: {
                provider: "discord",
                callbackURL: "/",
              },
            });
            if (res.url) {
              redirect(res.url);
            }
          }}
        >
          Sign in with Discord
        </Button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.user.name}</span>
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await auth.api.signOut({
              headers: headers(),
            });
            redirect("/");
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
