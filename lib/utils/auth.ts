import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  accounts,
  db,
  sessions,
  users,
  verificationTokens,
} from "@/lib/schema/schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image?: string | null;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_ID_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Runs first when user signs in
      if (account && profile) {
        token.id = profile.sub; // Google user ID
        token.picture = profile.picture; // Google profile image
      }
      return token;
    },
    async session({ session, token }) {
      // Attach custom fields to session
      if (token) {
        session.user.id = token.id as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});
