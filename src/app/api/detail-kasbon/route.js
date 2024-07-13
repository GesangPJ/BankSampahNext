// API Detail Kasbon. Lokasi : /src/app/api/detail-kasbon
// API untuk menampilkan detail dari kasbon

import { NextResponse } from "next/server"

import { getToken } from 'next-auth/jwt'

import prisma from "@/app/lib/prisma"

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Ambil Detail Kasbon')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  try {
    if (!id) {
      return NextResponse.json({ error: "Id Kasbon kosong" }, { status: 400 })
    }

    const kasbon = await prisma.kasbon.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { name: true } },
        admin: { select: { name: true } }
      }
    })

    if (!kasbon) {
      return NextResponse.json({ error: "Kasbon tidak ditemukan" }, { status: 404 })
    }

    const formattedKasbon = {
      ...kasbon,
      createdAt: kasbon.createdAt.toISOString(),
      updatedAt: kasbon.updatedAt.toISOString(),
      namaKaryawan: kasbon.user?.name || "-",
      namaAdmin: kasbon.admin?.name || "-"
    }

    console.log("Detail Kasbon", formattedKasbon)

    return NextResponse.json(formattedKasbon, { status: 200 })
  } catch (error) {
    console.error("Error mengambil data Kasbon", error)

    return NextResponse.json({ error: "Terjadi kesalahan saat mengambil data kasbon" }, { status: 500 })
  }
}
