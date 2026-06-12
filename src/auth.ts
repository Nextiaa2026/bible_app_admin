import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember me", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const remember = credentials?.remember === "true";
        if (!email || !password) return null;

        const res = await fetch(`${API_URL}/admin/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) return null;

        const data = (await res.json()) as {
          accessToken: string;
          admin: { id: string; email: string; name: string | null; role: string };
        };

        return {
          id: data.admin.id,
          email: data.admin.email,
          name: data.admin.name ?? data.admin.email,
          role: data.admin.role,
          accessToken: data.accessToken,
          remember,
        };
      },
    }),
  ],
});
