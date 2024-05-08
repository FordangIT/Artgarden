import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin"
  }
};

export default NextAuth(authOptions);