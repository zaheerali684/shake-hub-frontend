import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { HiMenu } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shakes", path: "/shakes" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Order Now", path: "/shakes", isButton: true },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/40 backdrop-blur-md shadow-md z-50">
      <div className="flex justify-between items-center px-6 md:px-20 py-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-gray-800 flex items-center">
          🍹 <span className="ml-2 text-pink-600">Shake</span>Hub
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`capitalize font-medium px-4 py-1 rounded-full transition ${
                item.isButton
                  ? "bg-pink-600 text-white hover:bg-pink-700"
                  : "text-gray-700 hover:text-pink-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <div
          className="md:hidden text-3xl text-gray-800 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <RxCross2 /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-transparent backdrop-blur-none">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`capitalize font-medium text-lg px-5 py-2 rounded-full transition ${
                item.isButton
                  ? "bg-pink-600 text-white hover:bg-pink-700"
                  : "text-gray-700 hover:text-pink-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
