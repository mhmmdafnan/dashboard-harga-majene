"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; 

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src="/images/LOGO-BPS.png" className="w-18" alt="Logo" />
            </div>
            <div className="ml-3 flex flex-col">
              <span className="font-bold text-lg italic">Dashboard Data Harga</span>
              <span className="text-sm italic">BPS KAB MAJENE</span>
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/?page=ihk" className="text-gray-700 hover:text-blue-600">
              IHK
            </Link>
            <Link href="/?page=harga" className="text-gray-700 hover:text-blue-600">
              Harga
            </Link>
          </nav>

          {/* Hamburger menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden mt-2 flex flex-col space-y-2">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/?page=ihk"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              IHK
            </Link>
            <Link
              href="/?page=harga"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Harga
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
