"use client";

import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';

interface HeaderProps {
  cartItemCount: number;
  onGoToCart: () => void;
}

const Navbar: React.FC<HeaderProps> = ({ cartItemCount, onGoToCart }) => {
  const [hover, setHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Abouts", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 text-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-gray-900 tracking-wider">
          emu/case
        </Link>
        
        {/* Masaüstü Menüsü */}
        <div className="hidden lg:flex items-center gap-10 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg hover:text-purple-600 transition duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Sağ Taraftaki İkonlar */}
        <div className="flex items-center gap-6">
          <FaUser className="cursor-pointer text-xl text-gray-700 hover:text-purple-600 transition" title="Üye Ol" />

          <div
            className="relative cursor-pointer"
            onClick={onGoToCart}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <FaShoppingCart className="text-2xl text-gray-700 hover:text-purple-600 transition duration-300" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartItemCount}
              </span>
            )}
            {hover && (
              <div className="absolute top-10 right-0 bg-gray-100 px-3 py-2 rounded shadow-lg text-sm text-gray-800 whitespace-nowrap">
                Sepete Git
              </div>
            )}
          </div>

          {/* Mobil Menü Butonu */}
          <div className="lg:hidden ml-4">
            <button onClick={toggleMenu} className="text-gray-700 text-2xl focus:outline-none">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Açılır Menü */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-transform duration-300 ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex flex-col items-center py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block w-full text-center py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 transition duration-300"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;