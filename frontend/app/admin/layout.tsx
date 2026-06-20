'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAuthStore from '@/store/authStore'
import Header from '@/components/layouts/admin/Header'
import Footer from '@/components/layouts/admin/Footer'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { token, user } = useAuthStore()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && (!token || !user)) {
      router.push('/login')
    }
  }, [isClient, token, user, router])

  if (!isClient) return null 
  if (!token || !user) return null
  
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}