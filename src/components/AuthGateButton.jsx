"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthGateButton({ href, children, className }) {
  const { status } = useSession();
  const target =
    status === "authenticated"
      ? href
      : `/signin?next=${encodeURIComponent(href)}`;
  return (
    <Link href={target} className={className}>
      {children}
    </Link>
  );
}
