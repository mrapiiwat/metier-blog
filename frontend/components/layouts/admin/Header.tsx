'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '../../Logo'
import { FiLogOut } from 'react-icons/fi'
import useAuthStore from '@/store/authStore'

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const pathname = usePathname()
  const router = useRouter()
  const { actionLogout } = useAuthStore()

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Blogs', path: '/admin/blogs' },
    { name: 'Manage Comments', path: '/admin/comments' },
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await actionLogout()
      setIsLogoutModalOpen(false)
      router.push('/login')
    } catch (error) {
      console.error('Logout failed', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      <header className="bg-[#1E202C] w-full px-6 py-4 md:px-16 relative z-40 border-b border-gray-800">
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
              onClick={() => setIsLogoutModalOpen(true)}
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
                setIsLogoutModalOpen(true)
              }}
              className="flex justify-center items-center gap-2 bg-red-500/10 text-red-500 font-bold w-full py-3 rounded-md mt-2 text-center text-sm"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </header>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-opacity">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLogOut className="text-red-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ออกจากระบบ</h3>
              <p className="text-sm text-gray-500 mb-6">
                คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบจัดการ?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex justify-center items-center gap-2 disabled:bg-red-400"
                >
                  {isLoggingOut ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      กำลังออก...
                    </>
                  ) : (
                    'ยืนยัน'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminHeader
