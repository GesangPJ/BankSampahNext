import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'


// GET /api/tabel-akun
export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Ambil Daftar Akun')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const TipeUser = "ANGGOTA"

  try {
    const users = await prisma.user.findMany({
      where:{userType : TipeUser,},
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data akun' }, { status: 500 })
  }
}
