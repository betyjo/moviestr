import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextauthOptions";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const url = new URL(req.url);
  const file = url.searchParams.get("url");
  if (!session) return NextResponse.redirect(`/signin?next=${encodeURIComponent(req.url)}`);
  if (!file) return NextResponse.json({ error: "Missing url" }, { status: 400 });
  return NextResponse.redirect(file);
}
