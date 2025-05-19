'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const navItems = [
    { name: "Beranda", href: "/userweb/beranda" },
    { name: "Tentang Kami", href: "/userweb/tentangkami" },
    { name: "Reservasi", href: "/userweb/reservasi" },
  ];

  return (
    <nav className="bg-black text-white rounded-full px-10 py-4 mx-auto max-w-6xl mt-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl">🕌</span>
        </div>

        {/* Menu */}
        <div className="flex space-x-10 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="cursor-pointer hover:text-yellow-500 transition-colors duration-200">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
