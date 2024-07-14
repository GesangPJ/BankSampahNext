// API Tambah Jenis Sampah. Lokasi : /src/app/api/tambah-jenis

// API untuk menambah jenis sampah

import { NextResponse } from 'next/server'

import bcrypt from 'bcrypt'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export const POST = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Tambah Jenis Sampah')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  try {
    const { nama, harga, keterangan} = await req.json()

    if (!nama || !harga || !keterangan) {
      return NextResponse.json({ error: "Semua bidang harus diisi." }, { status: 400 })
    }

    // Ambil tanggal dan waktu saat ini
    const now = new Date()
    const createdAt = now.toISOString()

    try {
      const jenissampah = await prisma.jenissampah.create({
        data: {
          namajenissampah: nama,
          hargajenissampah: parseInt(harga),
          keteranganjenissampah: keterangan,
          createdAt,
          updatedAt: createdAt,
        },
      })

      const historyjenis = await prisma.historyjenis.create({
        data:{
          namajenissampah: nama,
          hargajenis: harga,
          updatedAt: createdAt,
        }
      })

      return NextResponse.json(jenissampah, historyjenis, { status: 201 })
    } catch (error) {
      return NextResponse.json({ error: "Jenis Sampah Sudah ada" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses permintaan." }, { status: 500 })
  }
}
