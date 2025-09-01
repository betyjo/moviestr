// simple server-side auth helper that reads the next-auth session
import { getServerSession } from "next-auth/next";
import { authOptions } from "./nextauthOptions"; // we'll create this file next

export async function getSession(req) {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (e) {
    return null;
  }
}
