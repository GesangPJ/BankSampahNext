// API Tambah Jenis Sampah. Lokasi : /src/app/api/tambah-jenis

// API untuk menambah jenis sampah

import { NextResponse } from 'next/server'

import bcrypt from 'bcrypt'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export const POST = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    console.log('Unauthorized Access: API Tambah Jenis Sampah')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const { nama, harga, keterangan } = await req.json()

  if (!nama || !harga || !keterangan) {
    return NextResponse.json({ error: 'Semua bidang harus diisi.' }, { status: 400 })
  }

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

    await prisma.historyjenis.create({
      data: {
        namajenissampah: nama,
        hargajenis: parseInt(harga),
        updatedAt: createdAt,
      },
    })

    return NextResponse.json(jenissampah, { status: 201 })
  } catch (error) {
    console.error('Error processing request:', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat memproses permintaan.' }, { status: 500 })
  }
}
