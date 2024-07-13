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
    console.log('Unauthorized Access : API Ambil Laporan Bulanan Kasbon')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const url = new URL(req.url)
  const bulanTahun = url.searchParams.get('bulanTahun')

  const startDate = dayjs(bulanTahun).startOf('month').toDate()
  const endDate = dayjs(bulanTahun).endOf('month').toDate()

  const kasbons = await prisma.kasbon.findMany({
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
      jumlah: true,
      status_r: true,
      status_b: true,
      keterangan: true,
      metode: true,
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

  const formattedKasbons = kasbons.map(kasbon => ({
    ...kasbon,
    namaKaryawan: kasbon.user?.name || '-',
    namaAdmin: kasbon.admin?.name || '-',
  }))

  return NextResponse.json(formattedKasbons, {status:200})

}
