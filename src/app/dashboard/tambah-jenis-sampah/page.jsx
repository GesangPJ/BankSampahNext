"use client"

import { useEffect} from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import ViewTambahJenisSampah from "@/views/JenisSampah/tambahjenis"

const HalamanTambahJenisSampah = () =>{
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if(status === 'loading') return

    if(!session){
      router.push('/error/401')
    }

  }, [session, status, router])

  if(!session){
    return null
  }

  return(
    <div>
      <ViewTambahJenisSampah/>
    </div>
  )
}

export default HalamanTambahJenisSampah
