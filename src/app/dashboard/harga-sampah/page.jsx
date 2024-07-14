'use client'

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { useSession } from "next-auth/react"

import HalamanHargaSampah from "@/views/JenisSampah/hargasampah"

const HargaSampah = () =>{
  const {data: session, status} = useSession()
  const router = useRouter()

  useEffect(()=>{
    if (status === 'loading') return

    if(!session){
      router.push('/error/401')
    }
  }, [session, status, router])

  if(!session){
    return null
  }

  return(
    <div>
      <h1>Daftar Harga Sampah Terbaru</h1><br />
      <div>
        <HalamanHargaSampah/>
      </div>
    </div>
  )
}

export default HargaSampah
