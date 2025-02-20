"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { LuSearch } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import CartSidebar from "../Pages/CartSidebar";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Products", href: "/product" },
    { name: "Category", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    setMenuOpen(false);
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || sidebarOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen, sidebarOpen]);

  return (
    <header className="sm:p-4 px-0 py-4 border-b border-b-bordercolor sticky top-0 z-50 bg-light dark:bg-dark dark:border-b-dark-border">
      <div className="sm:px-3 px-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="uppercase font-medium text-3xl py-1 dark:text-light">
          Kaira
        </Link>

        <nav className="hidden md:flex font-body space-x-10">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-default hover:text-dark uppercase dark:text-light/70 dark:hover:text-light">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-5 relative">
          {/* Search */}
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <LuSearch size={20} className="text-default hover:text-dark cursor-pointer dark:text-light/70 dark:hover:text-light" />
          </button>

          {searchOpen && (
            <input
              type="search"
              placeholder="Search for this item..."
              className="text-default py-2 px-4 border border-[#777] dark:bg-dark-border dark:text-light focus:outline-none absolute top-[50px] right-20 text-base"
            />
          )}

          {/* Cart */}
          <button onClick={() => setSidebarOpen(true)} className="uppercase text-default hover:text-dark dark:text-light/70 dark:hover:text-light">
            Cart({cartCount})
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center space-x-4 relative">
          {/* Search */}
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <LuSearch size={20} className="text-default hover:text-dark cursor-pointer dark:text-light/70 dark:hover:text-light" />
          </button>

          {searchOpen && (
            <input
              type="search"
              placeholder="Search for this item..."
              className="text-default py-2 px-4 border border-[#777] dark:bg-dark-border dark:text-light  focus:outline-none absolute top-[50px] right-14 text-base"
            />
          )}

          {/* Cart */}
          <button onClick={() => setSidebarOpen(true)} className="uppercase text-default hover:text-dark dark:text-light/70 dark:hover:text-light">
            Cart({cartCount})
          </button>

          {/* Mobile Menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            <GiHamburgerMenu size={30} className="text-default hover:text-dark cursor-pointer dark:text-light/70 dark:hover:text-light" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#777] opacity-50 dark:bg-dark-deep z-40 transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-dark-deep shadow-lg p-6 z-50 transition-transform transform translate-x-0">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 text-xl font-bold text-gray-700 dark:text-light/70"
              aria-label="Close menu"
            >
              X
            </button>
            <nav className="flex flex-col space-y-4 py-4 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-default hover:text-dark uppercase dark:text-light/70 dark:hover:text-light"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#777] opacity-50 dark:bg-dark-deep z-40 transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
          <CartSidebar closeSidebar={() => setSidebarOpen(false)} />
        </>
      )}
    </header>
  );
}

export default Header;
