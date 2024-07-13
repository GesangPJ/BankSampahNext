// API Kasbon Request. Lokasi : /src/app/api/kasbon-request
// Untuk mengambil data kasbon dengan request "BELUM"

import { NextResponse } from "next/server"

import { getToken } from 'next-auth/jwt'

import prisma from "@/app/lib/prisma"

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Ambil Status Request')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const statusR = "BELUM"

  if (!userId) {
    return NextResponse.json({ error: 'User ID tidak ditemukan' }, { status: 400 })
  }

  console.log("User ID:", userId)

  try {
    const kasbons = await prisma.kasbon.findMany({
      where: {
        status_r: statusR,
      },
      select: {
        id: true,
        userId: true,
        jumlah: true,
        status_b: true,
        keterangan: true,
        metode: true,
        updatedAt: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    const formattedKasbons = kasbons.map(kasbon => ({
      ...kasbon,
      createdAt: kasbon.createdAt.toISOString(),
      updatedAt: kasbon.updatedAt.toISOString(),
      namaKaryawan: kasbon.user?.name || '-',
    }))

    console.log("Kasbons:", formattedKasbons)

    return NextResponse.json(formattedKasbons, { status: 200 })
  } catch (error) {
    console.error("Error fetching kasbons:", error)

    return NextResponse.json({ error: 'Ada kesalahan ketika mengembil data Kasbon' }, { status: 500 })
  }
}
