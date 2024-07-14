// API Edit Data Admin. Lokasi : /src/app/api/edit-admin

// API untuk mengubah email, nama akun Karyawan.

import { NextResponse } from "next/server"

import { getToken } from "next-auth/jwt"

import prisma from "@/app/lib/prisma"

export const PUT = async (req) =>{
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

  console.log('Token :', token)

  if(!token){
    console.log('Unauthorized Access : API Edit Jenis Sampah')

    return NextResponse.json({error:'Unauthorized Access'}, {status:401})
  }

  try{
    const {idjenissampah, namajenissampah, hargajenissampah, keteranganjenissampah} = await req.json()

    if(!idjenissampah || !namajenissampah || !hargajenissampah){
      return NextResponse.json({error:"Data tidak boleh kosong!"}, {status:400})
    }

    try{
      const jenissampah = await prisma.jenissampah.update({
        where: {id: idjenissampah},
        data:{
          namajenissampah:namajenissampah,
          hargajenissampah:hargajenissampah,
          keteranganjenissampah:keteranganjenissampah,
        },
      })

      return NextResponse.json({message:"Data Jenis Sampah Berhasil diubah", jenissampah}, {status:200})
    }
    catch(error){
      console.error("Error mengubah data jenis sampah : ", error)

      return NextResponse.json({error:"Ada kesalahan ketika mengganti data jenis sampah"}, {status:500})
    }
  }
  catch(error){
    console.error("Error tidak dapat parsing request body", error)

    return NextResponse.json({error:"Bad Request"}, {status:400})
  }
}
