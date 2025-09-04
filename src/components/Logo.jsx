import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.svg" alt="logo" width={75} height={75} />
      <span className="font-semibold tracking-wide">MovieStudio</span>
    </Link>
  );
}

