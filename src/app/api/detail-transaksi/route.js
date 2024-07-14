// API Detail Kasbon. Lokasi : /src/app/api/detail-kasbon
// API untuk menampilkan detail dari kasbon

import { NextResponse } from "next/server"

import { getToken } from 'next-auth/jwt'

import prisma from "@/app/lib/prisma"

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Ambil Detail Transaksi')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  try {
    if (!id) {
      return NextResponse.json({ error: "Id Transaksi kosong" }, { status: 400 })
    }

    const transaksi = await prisma.transaksi.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { name: true } },
        admin: { select: { name: true } }
      }
    })

    if (!kasbon) {
      return NextResponse.json({ error: "Transaksi tidak ditemukan" }, { status: 404 })
    }

    const formattedTransaksi = {
      ...transaksi,
      createdAt: transaksi.createdAt.toISOString(),
      updatedAt: transaksi.updatedAt.toISOString(),
      namaKaryawan: transaksi.user?.name || "-",
      namaAdmin: transaksi.admin?.name || "-"
    }

    console.log("Detail Kasbon", formattedKasbon)

    return NextResponse.json(formattedTransaksi, { status: 200 })
  } catch (error) {
    console.error("Error mengambil data Transaksi", error)

    return NextResponse.json({ error: "Terjadi kesalahan saat mengambil data transaksi" }, { status: 500 })
  }
}
