'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAuthStore from '@/store/authStore'
import Header from '@/components/layouts/admin/Header'
import Footer from '@/components/layouts/admin/Footer'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { token, user } = useAuthStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      if (!token || !user) {
        router.push('/login')
      }
    }
  }, [isMounted, token, user, router])

  if (!isMounted || !token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <span className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin mr-2"></span>
        กำลังโหลดข้อมูล...
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
