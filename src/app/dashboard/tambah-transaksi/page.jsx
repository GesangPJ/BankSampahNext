"use client"

import { useEffect} from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import KomponenTambahTransaksi from "@/views/transaksi/tambahtransaksi"

const HalamanTambahTransaksi = () =>{
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
      <div>
        <h1>Tambah Transaksi</h1>
      </div>
      <br />
      <KomponenTambahTransaksi/>
    </div>
  )
}

export default HalamanTambahTransaksi
