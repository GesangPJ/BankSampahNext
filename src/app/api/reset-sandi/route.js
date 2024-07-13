// API Reset Password. Lokasi : /src/app/api/reset-sandi

// API untuk reset password akun karyawan

import { NextResponse } from "next/server"

import bcrypt from 'bcrypt'

import { getToken } from "next-auth/jwt"

import prisma from "@/app/lib/prisma"


export const PUT = async (req) =>{
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

  console.log('Token: ', token)

  if(!token){
    console.log('Unauthorized Access : API Reset Sandi')

    return NextResponse.json({error:'Unauthorized Access'}, {status:401})
  }

  try{
    const {email, password} =await req.json()

    if(!email || !password){
      return NextResponse.json({error:"Data tidak boleh kosong!"}, {status:400})
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    try{
      const user = await prisma.user.update({
        where: {email: email},
        data:{
          password: hashedPassword,
        },
      })

      return NextResponse.json({message:"Password Berhasil diganti", user }, {status:200})
    }
    catch(error){
      console.error("Error memperbarui password :", error)

      return NextResponse.json({error:"Ada kesalahan ketika memperbarui Password"}, {status:500})
    }
  }catch(error){
    console.error("Error tidak dapat parsing request body", error)

    return NextResponse.json({error: "Bad Request"}, {status:400})
  }
}

