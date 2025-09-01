import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <img src="/logo.svg" alt="logo" width="28" height="28" />
      <span className="font-semibold tracking-wide">MovieStudio</span>
    </Link>
  );
}
