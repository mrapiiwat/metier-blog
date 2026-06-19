import Link from 'next/link'
const Logo = () => {
  return (
    <Link href="/" className="flex justify-between items-center w-27.25 cursor-pointer">
      <div className="w-12.5 h-12.5 bg-[#FFD6D6] rounded-full" />
      <h1 className="text-white font-light">LOGO</h1>
    </Link>
  )
}

export default Logo
