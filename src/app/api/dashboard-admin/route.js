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
    const transaksi = await prisma.transaksi.findMany({
      select: {
        id: true,
        userId: true,
        adminId: true,
        idjenissampah:true,
        hargasampah:true,
        berat:true,
        totalharga:true,
        keterangantransaksi:true,
        createdAt: true,
        updatedAt: true,
        jenissampah: {select:{namajenissampah:true}},
        user: {
          select: {
            name: true,
          },
        },
        admin: {
          select: {
            name: true,
          },
        },
      },
    })

    // Konversi tanggal ke format ISO dan tambahkan nama karyawan dan admin
    const formattedTransaksi = transaksi.map(transaksi => ({
      ...transaksi,
      createdAt: transaksi.createdAt.toISOString(),
      updatedAt: transaksi.updatedAt.toISOString(),
      namaUser: transaksi.user?.name || '-',
      namaAdmin: transaksi.admin?.name || '-',
      namajenissampah: transaksi.jenissampah.namajenissampah
    }))

    // Menghitung jumlah total berat
    const TotalBerat = transaksi.reduce((acc, transaksi) => acc + parseFloat(transaksi.berat), 0)

    // Menghitung jumlah total biaya
    const TotalBiaya = transaksi.reduce((acc, transaksi) => acc + parseFloat(transaksi.totalharga), 0)


    return NextResponse.json({
      transaksi: formattedTransaksi,
      TotalBerat,
      TotalBiaya,
    }, { status: 200 })
  } catch (error) {
    console.error('Error mengambil data transaksi :', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data kasbon' }, { status: 500 })
  }
}
