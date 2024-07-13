'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import ResetPasswordKaryawan from "@/views/reset-password/resetpassword-karyawan"
import ResetPasswordAdmin from '@/views/reset-password/resetpassword-admin'

const ResetPasswordAkun = () =>{
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

  return(
    <div>
      <h1>Reset Password Akun</h1>
      <br />
      <div>
        <ResetPasswordKaryawan/>
      </div>
      <br />
      <div>
        <ResetPasswordAdmin/>
      </div>
    </div>
  )
}

export default ResetPasswordAkun
