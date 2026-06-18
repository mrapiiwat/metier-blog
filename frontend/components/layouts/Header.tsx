"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '../Logo'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="bg-[#232536] w-full px-6 py-5 md:px-16 relative z-50">
      <div className="w-full flex justify-between items-center">

        <div className="flex items-center">
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <nav className="flex items-center gap-6 lg:gap-8 font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`${isActive ? 'text-white font-bold' : 'text-white/80 hover:text-white'} transition-all`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <a
            href="#footer"
            className="bg-white text-[#232536] font-bold px-6 py-2.5 rounded-md hover:bg-gray-100 transition-colors shrink-0 text-center"
          >
            Subscribe
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#232536] px-6 py-6 border-t border-gray-700/50 flex flex-col gap-5 md:hidden shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`${isActive ? 'text-white font-bold' : 'text-white/80'} block`}
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href="#footer"
            onClick={() => setIsOpen(false)}
            className="bg-white text-[#232536] font-bold w-full py-3 rounded-md mt-2 text-center block"
          >
            Subscribe
          </a>
        </div>
      )}
    </header>
  )
}

export default Header