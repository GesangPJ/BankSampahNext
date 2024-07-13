// API Kasbon Bayar. Lokasi : /src/app/api/kasbon-bayar
// API untuk mengambil data kasbon untuk konfirmasi bayar

import { NextResponse } from "next/server"

import { getToken } from 'next-auth/jwt'

import prisma from "@/app/lib/prisma"

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Ambil Status Bayar')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const namaKaryawan = decodeURIComponent(searchParams.get("namaKaryawan"))
  const statusR = "SETUJU"

  if (!namaKaryawan) {
    return NextResponse.json({ error: "Nama karyawan tidak ada" }, { status: 400 })
  }

  try {
    // Ambil userId berdasarkan namaKaryawan
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: namaKaryawan,
          mode: "insensitive"
        },
      },
      select: {
        id: true,
      },
    })

    if (users.length === 0) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 })
    }

    const userIds = users.map(user => user.id)

    // Ambil data kasbon berdasarkan userId dan status
    const kasbons = await prisma.kasbon.findMany({
      where: {
        userId: {
          in: userIds
        },
        status_r: statusR,
      },
      select: {
        id: true,
        userId: true,
        jumlah: true,
        metode: true,
        status_r:true,
        status_b:true,
        keterangan: true,
        updatedAt: true,
        createdAt: true,
        user: { select: { name: true } },
        admin: { select: { name: true } },
      },
    })

    const formattedKasbons = kasbons.map((kasbon) => ({
      ...kasbon,
      createdAt: kasbon.createdAt.toISOString(),
      updatedAt: kasbon.updatedAt.toISOString(),
      namaKaryawan: kasbon.user?.name || "-",
      namaAdmin: kasbon.admin?.name || "-",
    }))

    console.log("Kasbons:", formattedKasbons)

    return NextResponse.json(formattedKasbons, { status: 200 })
  } catch (error) {
    console.error("Error fetching kasbons:", error)

    return NextResponse.json(
      { error: "Ada kesalahan ketika mengambil data Kasbon" },
      { status: 500 }
    )
  }
}
