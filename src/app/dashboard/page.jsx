// Dashboard. Lokasi : /src/app/dashboard/page.jsx

'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

//Import Komponen dan pastikan komponen menjadi dynamic page
import DashboardSampahAdmin from '@/views/dashboard/DashboardAdmin'
import DashboardSampahAnggota from '@/views/dashboard/DashboardAnggota'

const DashboardAnalytics = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Jangan lakukan apa pun saat sesi sedang dimuat

    if (!session) {
      router.push('/error/401')
    }
  }, [session, status, router])

  if (!session) {
    return null
  }

  const isAdmin = session.user.userType === 'ADMIN'
  const isAnggota = session.user.userType === 'ANGGOTA'

  return (
    <div style={{ height: 400, width: '100%' }}>
        {isAdmin && (
          <div>
            <h1>Dashboard Admin</h1>
            <br />
            <DashboardSampahAdmin/>
          </div>
        )}
        {isAnggota && (
            <div>
              <h1>Dashboard Anggota</h1>
              <br />
            <DashboardSampahAnggota/>
            </div>
        )}
    </div>
  )
}

export default DashboardAnalytics
