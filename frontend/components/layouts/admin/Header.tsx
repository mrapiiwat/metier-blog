'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '../../Logo'
import { FiLogOut } from 'react-icons/fi'

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Blogs', path: '/admin/blogs' },
    { name: 'Manage Comments', path: '/admin/comments' },
  ]

  const handleLogout = () => {
    alert('ออกจากระบบเรียบร้อย')
    router.push('/login')
  }

  return (
    <header className="bg-[#1E202C] w-full px-6 py-4 md:px-16 relative z-50 border-b border-gray-800">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="hidden sm:block text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md tracking-wider uppercase">
            Admin Panel
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <nav className="flex items-center gap-6 lg:gap-8 font-medium text-sm">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.path)

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`
                    relative transition-all duration-300
                    ${isActive ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}
                    /* เอฟเฟกต์เส้นใต้เวลา Hover */
                    after:content-[''] after:absolute after:left-0 after:-bottom-5.25 after:h-0.5 after:w-0 
                    hover:after:w-full after:transition-all after:duration-300
                    ${isActive ? 'after:w-full' : ''}
                  `}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 font-bold px-5 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors shrink-0 text-sm cursor-pointer"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1E202C] px-6 py-6 border-t border-gray-800 flex flex-col gap-5 md:hidden shadow-xl">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.path)
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`${isActive ? 'text-white font-bold' : 'text-gray-400'} block text-sm transition-colors`}
              >
                {link.name}
              </Link>
            )
          })}
          <button
            onClick={() => {
              setIsOpen(false)
              handleLogout()
            }}
            className="flex justify-center items-center gap-2 bg-red-500/10 text-red-500 font-bold w-full py-3 rounded-md mt-2 text-center text-sm"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </header>
  )
}

export default AdminHeader
