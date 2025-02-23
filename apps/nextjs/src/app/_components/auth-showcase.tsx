import { getSession } from "@acme/auth";
import { Button } from "@acme/ui/button";
import { headers } from "next/headers";
import { auth } from "@acme/auth";
import { redirect } from "next/navigation";

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
                callbackURL: "/"
              },
            });
            redirect(res.url)
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
            throw redirect("/")
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
