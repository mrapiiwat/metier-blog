'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IoArrowBackSharp } from 'react-icons/io5'
import { MdAdminPanelSettings } from 'react-icons/md'
import useAuthStore from '@/store/authStore'
import { AxiosError } from 'axios'

const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { actionLogin, user, token } = useAuthStore()

  useEffect(() => {
    if (token || user) {
      router.push('/admin')
    }
  }, [token, user, router])


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน')
      return
    }

    setIsLoading(true)

    try {
      await actionLogin({ username, password })

      router.push('/admin')
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
        setError(errorMessage)
      } else {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50/50 p-4 sm:p-6 font-sans relative">
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-all"
        >
          <IoArrowBackSharp size={18} />
          <span>กลับหน้าเว็บไซต์</span>
        </Link>
      </div>

      <div className="w-full max-w-100 bg-white border border-gray-100 rounded-3xl shadow-xs p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <MdAdminPanelSettings size={50} />
          </div>

          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Admin Portal</h1>
          <p className="text-sm text-gray-400 mt-1.5">เข้าสู่ระบบเพื่อจัดการเนื้อหาเว็บไซต์</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="username" className="text-sm font-bold text-gray-800">
              ชื่อผู้ใช้ (Username)
            </label>
            <input
              type="text"
              id="username" // 🔥 เปลี่ยนเป็น type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full text-sm px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-gray-900 focus:bg-white transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-bold text-gray-800">
                รหัสผ่าน
              </label>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-gray-900 focus:bg-white transition-all"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-xs font-medium text-red-600 text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 mt-2 text-white text-sm font-bold rounded-xl transition-all shadow-xs flex justify-center items-center gap-2
                            ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-900 hover:bg-gray-800 cursor-pointer active:scale-[0.98]'
              }`}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                กำลังเข้าสู่ระบบ...
              </>
            ) : (
              'เข้าสู่ระบบ'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
