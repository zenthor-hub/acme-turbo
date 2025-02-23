import { db } from "@acme/db/client";
import { oAuthProxy } from "better-auth/plugins"
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "../env";
import { expo } from "@better-auth/expo";

export const config = {
    database: drizzleAdapter(db, {
        provider: "pg"
    }),
    secret: env.AUTH_SECRET,
    plugins: [oAuthProxy(), expo()],
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data, request) {
            // Send an email to the user with a link to reset their password
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
    },
    trustedOrigins: ["exp://"]
} satisfies BetterAuthOptions

export const auth = betterAuth(config);
export type Session = typeof auth.$Infer.Session