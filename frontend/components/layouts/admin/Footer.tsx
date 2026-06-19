"use client"
import Link from "next/link"
import Logo from "../../Logo"
import { FiExternalLink } from "react-icons/fi"

const AdminFooter = () => {
  return (
    <footer className='bg-[#1E202C] w-full p-6 md:px-16 md:py-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-800 mt-auto'>

      <div className="flex items-center gap-4">
        <Logo />
        <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>
        <p className="text-gray-400 text-xs sm:text-sm">
          Blog System Management
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs sm:text-sm">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
        >
          <span>ไปที่หน้าเว็บไซต์หลัก</span>
          <FiExternalLink size={14} />
        </Link>

        <div className="text-gray-600">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>

    </footer>
  )
}

export default AdminFooter