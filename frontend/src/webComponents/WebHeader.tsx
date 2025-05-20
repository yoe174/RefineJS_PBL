// src\webComponents\WebHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function WebHeader() {
  const pathname = usePathname();

  return (
    <header className="web-header">
      <div className="nav-container">
        <h1 className="logo">
          <Link href="/">My Website</Link>
        </h1>
        <nav className="nav-links">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Beranda
          </Link>
          <Link href="/tentang" className={pathname === "/tentang" ? "active" : ""}>
            Tentang Kami
          </Link>
          <Link href="/reservasi" className={pathname === "/reservasi" ? "active" : ""}>
            Reservasi
          </Link>
        </nav>
        <div>
          <Link href="/login" className="login-button">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
