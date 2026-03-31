import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // Only allow YOUR GitHub account to log in
      return profile?.login === "mohammedishmamu-hash";
    },
    async session({ session, token }) {
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});