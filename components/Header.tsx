import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="py-4 md:px-8">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            src="/efg-favicon-300x300.png"
            alt="ESL FACEIT Group Logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
