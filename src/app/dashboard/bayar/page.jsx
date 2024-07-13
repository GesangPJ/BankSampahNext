'use client'

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { useSession } from "next-auth/react"

import StatusBayar from "@/views/status-bayar/StatusBayar"

const BayarKasbon = () =>{
  const {data: session, status} = useSession()
  const router = useRouter()

  useEffect(()=>{
    if(status==='loading') return

    if(!session){
      router.push('/error/401')
    }
  },[session, status, router])

  if(!session){
    return null
  }

  return(
    <div>
      <h1>Halaman Status Bayar Kasbon</h1>
      <br />
      <StatusBayar/>
    </div>
  )
}

export default BayarKasbon
