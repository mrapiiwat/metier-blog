'use client'
import Logo from '../Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsSend } from 'react-icons/bs'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const pathname = usePathname()

  const getLinkClass = (path: string) => {
    return pathname === path
      ? 'text-white font-bold underline underline-offset-4'
      : 'text-white hover:opacity-80 transition-opacity'
  }

  return (
    <footer
      id="footer"
      className="bg-[#232536] w-full p-6 md:px-16 md:py-10 flex flex-col gap-8 justify-between"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo />
        <div className="flex flex-wrap justify-center gap-5 md:gap-6 text-sm font-medium">
          <Link className={getLinkClass('/')} href="/">
            Home
          </Link>
          <Link className={getLinkClass('/blogs')} href="/blogs">
            Blogs
          </Link>
          <Link className={getLinkClass('/contact')} href="/contact">
            Contact us
          </Link>
        </div>
      </div>

      {/* ส่วน Newsletter และส่วนล่างคงเดิม */}
      <div className="bg-[#2A2B39]/60 rounded-sm py-10 px-6 md:px-12 flex flex-col lg:flex-row justify-between items-center gap-6">
        <h2 className="text-white text-xl md:text-[28px] lg:text-[32px] font-bold tracking-tight text-center lg:text-left max-w-xl leading-snug">
          Subscribe to our news letter to get latest updates and news
        </h2>
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 items-center">
          <input
            className="bg-white text-gray-700 text-sm w-full sm:w-80 h-12 rounded-md px-4 outline-none placeholder:text-gray-400"
            type="text"
            placeholder="example@email.com"
          />
          <button className="flex justify-center items-center gap-2 bg-[#FF5959] w-full sm:w-36 h-12 text-sm font-bold rounded-md text-white cursor-pointer hover:bg-[#ff4646] transition-colors shrink-0">
            Subscribe <BsSend size={16} />
          </button>
        </div>
      </div>

      <div className="text-white/70 text-xs md:text-sm flex flex-col-reverse md:flex-row justify-between items-center md:items-end gap-4 pt-2">
        <div className="text-center md:text-left space-y-0.5">
          <p>Finstreet 118 2561 abctown</p>
          <p>example@femail.com &nbsp;001 21345 442</p>
        </div>
        <div className="flex justify-center items-center gap-5 text-white">
          <FaFacebook size={18} className="cursor-pointer hover:opacity-80 transition-opacity" />
          <FaTwitter size={18} className="cursor-pointer hover:opacity-80 transition-opacity" />
          <FaInstagram size={18} className="cursor-pointer hover:opacity-80 transition-opacity" />
          <FaLinkedin size={18} className="cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
