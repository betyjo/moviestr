import NextAuth from "next-auth";
import { authOptions } from "@/lib/nextauthOptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
