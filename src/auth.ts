import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const SESSION_SHORT = 8 * 60 * 60;
const SESSION_LONG = 30 * 24 * 60 * 60;

export const { handlers, auth, signIn, signOut } = NextAuth({
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
  session: { strategy: "jwt", maxAge: SESSION_LONG },
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      if (path.startsWith("/login") || path.startsWith("/api/auth")) return true;
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        const remember = user.remember ?? false;
        token.remember = remember;
        const maxAge = remember ? SESSION_LONG : SESSION_SHORT;
        token.exp = Math.floor(Date.now() / 1000) + maxAge;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      if (session.user) {
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

export default auth((req) => {
  if (!req.auth && !req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
});
