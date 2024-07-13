// API Edit Data Admin. Lokasi : /src/app/api/edit-admin

// API untuk mengubah email, nama akun Karyawan.

import { NextResponse } from "next/server"

import { getToken } from "next-auth/jwt"

import prisma from "@/app/lib/prisma"

export const PUT = async (req) =>{
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
  const resetKey = process.env.ADMIN_KEY

  console.log('Token :', token)

  if(!token){
    console.log('Unauthorized Access : API Edit Karyawan')

    return NextResponse.json({error:'Unauthorized Access'}, {status:401})
  }

  try{
    const {userId, nama, email, masterKey} = await req.json()

    if(!userId || !nama || !email || !masterKey){
      return NextResponse.json({error:"Data tidak boleh kosong!"}, {status:400})
    }

    if(masterKey !== resetKey){
      return NextResponse.json({error: "MasterKey Salah!"}, {status:403})
    }

    try{
      const user = await prisma.user.update({
        where: {id: userId},
        data:{
          name:nama,
          email:email,
        },
      })

      return NextResponse.json({message:"Data Admin Berhasil diubah", user}, {status:200})
    }
    catch(error){
      console.error("Error mengubah data admin : ", error)

      return NextResponse.json({error:"Ada kesalahan ketika mengganti data admin"}, {status:500})
    }
  }
  catch(error){
    console.error("Error tidak dapat parsing request body", error)

    return NextResponse.json({error:"Bad Request"}, {status:400})
  }
}
