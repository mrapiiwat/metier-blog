'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react' // ไม่ต้องใช้ useState
import useAuthStore from '@/store/authStore'
import Header from '@/components/layouts/admin/Header'
import Footer from '@/components/layouts/admin/Footer'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { token, user } = useAuthStore()

  useEffect(() => {
    if (!token || !user) {
      router.push('/login')
    }
  }, [token, user, router])

  if (typeof window === 'undefined' || !token || !user) {
    return null
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
