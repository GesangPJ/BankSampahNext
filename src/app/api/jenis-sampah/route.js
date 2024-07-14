// API Jenis Sampah. Lokasi : /src/app/api/jenis-sampah/route.js

import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Jenis Sampah')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }


  try {
    const jenissampah = await prisma.jenissampah.findMany({
      select: {
        id: true,
        namajenissampah:true,
        hargajenissampah: true,
        keteranganjenissampah: true,
      },
    })

    return NextResponse.json(jenissampah, { status: 200 })
  } catch (error) {
    console.error('Error mengambil jenis sampah:', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data jenis sampah' }, { status: 500 })
  }
}
