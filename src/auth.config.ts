import type { NextAuthConfig } from "next-auth";

const SESSION_SHORT = 8 * 60 * 60;
const SESSION_LONG = 30 * 24 * 60 * 60;

export const SESSION = { short: SESSION_SHORT, long: SESSION_LONG };

export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: SESSION_LONG },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      if (path.startsWith("/login") || path.startsWith("/api/auth")) return true;
      return !!auth;
    },
    jwt({ token, user }) {
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
    session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      if (session.user) {
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
