'use client'

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { useSession } from "next-auth/react"

import PrintLaporan from "@/views/print-laporan/PrintLaporan"

const CetakKasbon = () =>{
  const {data:session, status} = useSession()
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
      <div>
        <h1>Print Laporan Kasbon</h1>
      </div>
      <div>
        <PrintLaporan/>
      </div>
    </div>
  )
}

export default CetakKasbon
