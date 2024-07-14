// Tambah Kasbon API. Lokasi : /src/app/api/tambah-kasbon/route.js

import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export const POST = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access: API Tambah Kasbon')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  try {
    const { userId, idjenissampah, berat, adminId, keterangan } = await req.json()

    if (!userId || !idjenissampah || !berat || !adminId) {
      return NextResponse.json({ error: 'Semua bidang harus diisi.' }, { status: 400 })
    }

    const jenisSampah = await prisma.jenisSampah.findUnique({
      where: {
        id: idjenissampah,
      },
      select: {
        hargajenissampah: true,
      },
    })

    if (!jenisSampah) {
      return NextResponse.json({ error: 'Jenis sampah tidak ditemukan.' }, { status: 404 })
    }

    const hargajenissampah = jenisSampah.hargajenissampah

    // Ambil tanggal dan waktu saat ini
    const now = new Date()
    const createdAt = now.toISOString()
    const hargasampah = hargajenissampah
    const HitungTotalHarga = hargasampah * berat

    try {
      const transaksi = await prisma.transaksi.create({
        data: {
          userId,
          adminId,
          berat,
          totalharga: HitungTotalHarga,
          idjenissampah,
          hargasampah,
          keterangantransaksi: keterangan,
          createdAt,
          updatedAt: createdAt,
        },
      })

      console.log('Transaksi dibuat:', transaksi)

      return NextResponse.json(transaksi, { status: 201 })
    } catch (error) {
      console.error('Error membuat transaksi:', error)

      return NextResponse.json({ error: 'Transaksi sudah ada.' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error membuat transaksi:', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat memproses permintaan.' }, { status: 500 })
  }
}
