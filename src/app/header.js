"use client";

import {
  HiHome,
  HiChartSquareBar,
  HiCurrencyDollar,
  HiMenu,
  HiX,
} from "react-icons/hi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "dashboard";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      icon: <HiHome size={18} />,
      href: "/",
      page: "dashboard",
    },
    {
      name: "IHK",
      icon: <HiChartSquareBar size={18} />,
      href: "/?page=ihk",
      page: "ihk",
    },
    {
      name: "Harga",
      icon: <HiCurrencyDollar size={18} />,
      href: "/?page=harga",
      page: "harga",
    },
  ];

  const renderLink = (item) => {
    const isActive = page === item.page;
    const baseClass =
      "flex items-center gap-2 hover:text-[#FF9B00]";
    const activeClass = " text-[#FF9B00] font-semibold";
    return (
      <Link
        key={item.name}
        href={item.href}
        className={`${baseClass} ${isActive ? activeClass : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        {item.icon} {item.name}
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-2 z-50 mx-auto max-w-7xl rounded-2xl shadow-md transition-colors duration-300 ${
        isScrolled ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/images/LOGO-BPS.png" className="w-18" alt="Logo" />
            <div className="ml-3 flex flex-col">
              <span className="font-bold text-lg italic">
                Dashboard Data Harga
              </span>
              <span className="text-sm italic">BPS KAB MAJENE</span>
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map(renderLink)}
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
            {navItems.map(renderLink)}
          </nav>
        )}
      </div>
    </header>
  );
}
