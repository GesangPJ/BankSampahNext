'use client'

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { useSession } from "next-auth/react"

import StatusRequest from "@/views/status-request/StatusRequest"

const RequestKasbon = () =>{
  const {data:session,status} = useSession()
  const router = useRouter()

  useEffect(()=>{
    if(status === 'loading') return

    if(!session){
      router.push('/error/401')
    }
  },[session,status,router])

  if(!session){
    return null
  }

  return(
    <div>
      <h1>Status Request Kasbon</h1>
      <br />
      <StatusRequest/>
    </div>
  )
}

export default RequestKasbon
