import { prisma } from "@/lib/prisma";
import { errorResponse } from "@/lib/response";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          if (!credentials) return null;
          const email = credentials.email.toLowerCase().trim();
          const password = credentials.password;

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            return null;
          }

          const userPassword = user.password;

          const isSamePassword = await bcrypt.compare(password, userPassword);

          if (!isSamePassword) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error: any) {
          console.log("error in login next-auth", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name || "";
        token.email = user.email || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
