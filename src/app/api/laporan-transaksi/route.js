// API Laporan Kasbon Bulanan. Lokasi : /src/app/api/laporan-kasbon

// API untuk mengambil kasbon bulanan

import { NextResponse } from "next/server"

import dayjs from 'dayjs'

import { getToken } from 'next-auth/jwt'

import prisma from "@/app/lib/prisma"

export async function GET(req){
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Ambil Laporan Bulanan Transaksi')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const url = new URL(req.url)
  const bulanTahun = url.searchParams.get('bulanTahun')

  const startDate = dayjs(bulanTahun).startOf('month').toDate()
  const endDate = dayjs(bulanTahun).endOf('month').toDate()

  const transaksi = await prisma.transaksi.findMany({
    where: {
      updatedAt: {
        gte: startDate,
        lt: endDate
      }

    },

    select: {
      id: true,
      userId: true,
      adminId: true,
      hargasampah: true,
      totalharga: true,
      berat:true,
      idjenissampah: true,
      keterangantransaksi: true,
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

  const formattedTransaksi = kasbons.map(transaksi => ({
    ...transaksi,
    namaUser: kasbon.user?.name || '-',
    namaAdmin: kasbon.admin?.name || '-',
    namajenissampah: transaksi.jenissampah.namajenissampah
  }))

  return NextResponse.json(formattedTransaksi, {status:200})

}
