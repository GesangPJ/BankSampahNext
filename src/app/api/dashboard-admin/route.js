// API Dashboard Admin. Lokasi : /src/app/api/dashboard-admin/route.js

import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Dashboard Admin')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID tidak ditemukan!' }, { status: 400 })
  }

  console.log(userId)

  try {
    const kasbons = await prisma.kasbon.findMany({
      select: {
        id: true,
        userId: true,
        adminId: true,
        jumlah: true,
        status_r: true,
        status_b: true,
        keterangan: true,
        metode: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true, // Mengambil nama karyawan
          },
        },
        admin: {
          select: {
            name: true, // Mengambil nama admin
          },
        },
      },
    })

    // Konversi tanggal ke format ISO dan tambahkan nama karyawan dan admin
    const formattedKasbons = kasbons.map(kasbon => ({
      ...kasbon,
      createdAt: kasbon.createdAt.toISOString(),
      updatedAt: kasbon.updatedAt.toISOString(),
      namaKaryawan: kasbon.user?.name || '-',
      namaAdmin: kasbon.admin?.name || '-',
    }))

    // Menghitung jumlah total, total setuju, total lunas, dan belum lunas
    const jumlahTotal = kasbons.reduce((acc, kasbon) => acc + kasbon.jumlah, 0)

    // Kasbon Yang Disetujui
    const TotalSetuju = kasbons
      .filter(kasbon => kasbon.status_r === 'SETUJU')
      .reduce((acc, kasbon) => acc + kasbon.jumlah, 0)

      // Kasbon yang sudah LUNAS
    const TotalLunas = kasbons
      .filter(kasbon => kasbon.status_b === 'LUNAS')
      .reduce((acc, kasbon) => acc + kasbon.jumlah, 0)

      // Kasbon yang Belum Lunas
    const belumLunas = jumlahTotal - TotalLunas

    return NextResponse.json({
      kasbons: formattedKasbons,
      jumlahTotal,
      TotalSetuju,
      TotalLunas,
      belumLunas
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching kasbon data:', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data kasbon' }, { status: 500 })
  }
}
