'use client'

import React, { useState } from 'react'

import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Button, TableHead } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DataObjectIcon from '@mui/icons-material/DataObject'
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import ExcelJS from 'exceljs'

const formatDate = (dateString) => {
  if (!dateString) return 'Invalid Date'
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}-${month}-${year} ${hours}:${minutes}`
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatDecimal = (number) => {
  const parsedNumber = parseFloat(number)

  if (isNaN(parsedNumber)) {
    return '0.00';
  }

  return parsedNumber.toFixed(2)
}

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text
  }

  return text.slice(0, maxLength) + '...'
}

const PrintLaporan = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchConducted, setSearchConducted] = useState(false)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleSearch = async () => {
    if (selectedDate) {
      const bulanTahun = dayjs(selectedDate).format('YYYY-MM')

      try {
        const response = await fetch(`/api/laporan-transaksi?bulanTahun=${bulanTahun}`)
        const data = await response.json()

        // Tambahkan nomor urut
        const numberedData = data.map((row, index) => ({ ...row, no: index + 1 }))

        setRows(numberedData)

      } catch (error) {
        console.error('Error mengambil data transaksi:', error)
      } finally {
        setLoading(false)
        setSearchConducted(true)
      }
    } else {
      console.error('Pilih bulan dan tahun!')
    }
  }

    const columns = [
      { field: 'no', headerName: 'No', width: 50, headerClassName:'app-theme--header', },
      {
        field: 'updatedAt',
        headerName: 'Tanggal/Jam',
        headerClassName:'app-theme--header',
        width: 150,
        renderCell: (params) => <div>{formatDate(params.value)}</div>,
      },{
        field: 'namaUser',
        headerName: 'Nama User',
        headerClassName:'app-theme--header',
        width: 120,
      },
      {
        field: 'namajenissampah',
        headerName: 'Sampah',
        headerClassName:'app-theme--header',
        width: 120,
      },
      {
        field: 'hargasampah',
        headerName: 'Harga',
        headerClassName:'app-theme--header',
        width: 120,
        renderCell: (params) => <div>{formatCurrency(params.value)}</div>,
      },
      {
        field: 'berat',
        headerName: 'Berat (Kg)',
        headerClassName:'app-theme--header',
        width: 100,
        renderCell: (params) => <div>{formatDecimal(params.value)}</div>,
      },
      {
        field: 'totalharga',
        headerName: 'Harga Total',
        headerClassName:'app-theme--header',
        width: 120,
        renderCell: (params) => <div>{formatCurrency(params.value)}</div>,
      },
      {
        field: 'keterangantransaksi',
        headerName: 'Keterangan',
        headerClassName:'app-theme--header',
        width: 160,
        renderCell: (params) => <div>{truncateText(params.value, 50)}</div>,
      },
      {
        field: 'namaAdmin',
        headerName: 'Admin',
        headerClassName:'app-theme--header',
        width: 120,
      },
    ]

    const handleExcelExport = async () => {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Transaksi Sampah')

      // Menambahkan header
      worksheet.columns = columns

        // .filter(col => col.field !== 'detail')
        .map(col => ({
          header: col.headerName,
          key: col.field,
          width: col.width / 10 || 20, // Lebar kolom
        }))

      // Menambahkan baris data
      rows.forEach((row) => {
        const rowData = {}

        columns.forEach(col => {
          if (col.field !== 'detail') {
            rowData[col.field] = row[col.field]
          }
        })
        worksheet.addRow(rowData)
      })

      // Menulis buffer
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const link = document.createElement('a')

      const bulan = dayjs(selectedDate).format('MM')

      link.href = URL.createObjectURL(blob)
      link.download = `TransaksiSampah-Bulan-${bulan}.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const handlePDF = () => {
      const doc = new jsPDF()

      const columns = [
        { header: 'No', dataKey: 'no' },
        { header: 'Tanggal/Jam', dataKey: 'updatedAt' },
        { header: 'Nama Anggota', dataKey: 'namaUser' },
        { header: 'Jenis Sampah', dataKey: 'namajenissampah' },
        { header: 'Harga per Kg', dataKey: 'hargasampah' },
        { header: 'Berat', dataKey: 'berat' },
        { header: 'Total Harga', dataKey: 'totalharga' },
        { header: 'Nama Admin', dataKey: 'namaAdmin' },
      ]

      const rowsForPDF = rows.map(row => ({
        no: row.no,
        updatedAt: formatDate(row.updatedAt),
        namaUser: row.namaUser,
        namajenissampah: row.namajenissampah,
        hargasampah: formatCurrency(row.hargasampah),
        berat: formatDecimal(row.berat),
        totalharga: formatCurrency(row.totalharga),
        namaAdmin: row.namaAdmin
      }))

      autoTable(doc, {
        head: [columns.map(col => col.header)],
        body: rowsForPDF.map(row => columns.map(col => row[col.dataKey])),
      })

      const bulan = dayjs(selectedDate).format('MM')

      doc.save(`TransaksiSampah-Bulan-${bulan}.pdf`)
    }

    const handleJSON = () => {
      const json = JSON.stringify(rows, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const link = document.createElement('a')

      const bulan = dayjs(selectedDate).format('MM')

      link.href = URL.createObjectURL(blob)
      link.download = `transaksisampah-bulan-${bulan}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

  return (
    <div>
      <div className='flex items-center space-x-4 my-[15px]'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={'"Bulan" dan "Tahun"'}
            views={['month', 'year']}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Button
          variant='outlined'
          color='primary'
          sx={{ borderRadius: 30 }}
          startIcon={<SearchIcon />}
          size='large'
          onClick={handleSearch}
        >
          Cari Data
        </Button>
      </div>
      <br />
      <div>
        <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <Button variant='outlined' color="error" size="large" startIcon={<PictureAsPdfIcon />} sx={{ borderRadius: 30 }} onClick={handlePDF}>
            PDF Export
          </Button>
          <Button variant='outlined' color="success" startIcon={<ListAltIcon />} sx={{ borderRadius: 30 }} onClick={handleExcelExport}>
            Export XLSX
          </Button>
          <Button variant='outlined' color="warning" size="large" sx={{ borderRadius: 30 }} startIcon={<DataObjectIcon />} onClick={handleJSON}>
            JSON
          </Button>
        </Box>
      </div>
      <div className='my-[25px]'>
      <Box
          sx={{
            height: 400,
            width: '100%',
            '& .app-theme--header': {
              fontWeight: 'bold',
              fontSize: '1.1rem', // Adjust as needed
            },
          }}
        >
          <DataGrid
            rows={rows}
            sx={{
              '@media print': {
                '.MuiDataGrid-main': {
                  color: 'rgba(0, 0, 0, 0.87)',
                  backgroundColor: 'white',
                  '-webkit-print-color-adjust': 'exact', // Ensure colors print correctly
                },
                '.MuiDataGrid-cell, .MuiDataGrid-columnHeader': {
                  color: 'rgba(0, 0, 0, 0.87)',
                  '-webkit-print-color-adjust': 'exact',
                },
              },
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            loading={loading}
            getRowId={(row) => row.id}
            localeText={{
              noRowsLabel: searchConducted ? 'Data tidak ditemukan' : 'Data tidak ditemukan, pilih bulan dan tahun terlebih dahulu!',
            }}
          />
        </Box>
      </div>
    </div>
  )
}

export default PrintLaporan
