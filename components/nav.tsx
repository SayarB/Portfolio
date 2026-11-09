"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname.startsWith(item.href) ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
