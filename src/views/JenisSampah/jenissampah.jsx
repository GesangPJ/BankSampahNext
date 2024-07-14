'use client'

import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DataObjectIcon from '@mui/icons-material/DataObject'
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import ExcelJS from 'exceljs'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const HalamanJenisSampah = () =>{
  const { data: session } = useSession()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ id: '', namajenissampah: '', hargajenissampah: '', keteranganjenissampah: '' })

  const handleClickOpen = (row) => {
    setFormData({ id: row.id, namajenissampah: row.namajenissampah, hargajenissampah: row.hargajenissampah, keteranganjenissampah: row.keteranganjenissampah })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/edit-jenissampah', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Data Admin Berhasil diubah')
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === formData.userId
              ? { ...row, name: formData.nama, email: formData.email }
              : row
          )
        )
      } else {
        alert(result.error || 'Ada kesalahan ketika mengganti data akun')
      }

      handleClose()
    } catch (error) {
      console.error('Error mengubah data akun:', error)
      alert('Ada kesalahan ketika mengganti data akun')
    }
  }

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/jenis-sampah`)
          const data = await response.json()

          // Tambahkan nomor urut
          const numberedData = data.map((row, index) => ({ ...row, no: index + 1 }))

          setRows(numberedData)

          setLoading(false)
        } catch (error) {
          console.error('Error mengambil data:', error)
        }
      }

      fetchData()
    }
  }, [session])

  const columns = [
    { field: 'no', headerName: 'No', width: 80, headerClassName:'app-theme--header', },
    {
      field: 'namajenissampah',
      headerName: 'Jenis Sampah',
      headerClassName:'app-theme--header',
      width: 150,
    },{
      field: 'hargajenissampah',
      headerName: 'Harga per Kg',
      headerClassName:'app-theme--header',
      width: 160,
      renderCell: (params) => <div>{formatCurrency(params.value)}</div>,
    },
    {
      field: 'keteranganjenissampah',
      headerName: 'Keterangan',
      headerClassName: 'app-theme--header',
      width: 160,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      headerClassName: 'app-theme--header',
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row)}>
          Edit
        </Button>
      ),
    }
  ]

  const handleExcelExport = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Jenis Sampah')

    // Menambahkan header
    worksheet.columns = columns
      .filter(col => col.field !== 'edit')
      .map(col => ({
        header: col.headerName,
        key: col.field,
        width: col.width / 10 || 20, // Lebar kolom
      }))

    // Menambahkan baris data
    rows.forEach((row) => {
      const rowData = {}

      columns.forEach(col => {
        if (col.field !== 'edit') { // Hapus data kolom detail
          rowData[col.field] = row[col.field]
        }
      })
      worksheet.addRow(rowData)
    })

    // Menulis buffer
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = `DataJenisSampah.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePDF = () => {
    const doc = new jsPDF()

    const columns = [
      { header: 'No', dataKey: 'no' },
      { header: 'Jenis Sampah', dataKey: 'namajenissampah' },
      { header: 'Harga per Kg', dataKey: 'hargajenissampah' },
      { header: 'Keterangan', dataKey: 'keteranganjenissampah' },
    ]

    const rowsForPDF = rows.map(row => ({
      no: row.no,
      namajenissampah: row.namajenissampah,
      hargajenissampah: formatCurrency(row.hargajenissampah),
      keteranganjenissampah:row.keteranganjenissampah,
    }))

    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: rowsForPDF.map(row => columns.map(col => row[col.dataKey])),
    })

    doc.save('Kasbon.pdf')
  }

  const handleJSON = () => {
    const json = JSON.stringify(rows, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = 'data_jenissampah.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return(
    <div>
      <div>
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
            slots={{ toolbar: GridToolbar, printOptions:{
              pageStyle: '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }',
              hideToolbar: true,
              hideFooter: true,
            } }}
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
            getRowId={(row) => row.id} // Tetap gunakan ID asli untuk identifikasi baris
          />
        </Box>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Data Jenis Sampah</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Masukkan data yang ingin diubah.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="namajenissampah"
            label="Jenis Sampah"
            type="text"
            fullWidth
            value={formData.namajenissampah}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="hargajenissampah"
            label="Harga per Kg"
            type="number"
            fullWidth
            value={formData.hargajenissampah}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="keteranganjenissampah"
            label="Keterangan"
            type="text"
            fullWidth
            value={formData.keteranganjenissampah}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="error" sx={ { borderRadius: 30 } }>
            Batal
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary" sx={ { borderRadius: 30 } }>
            Kirim
          </Button>
        </DialogActions>
      </Dialog>
      <div>
      <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        <Button variant='outlined' color="error" size="large" startIcon={<PictureAsPdfIcon/>} sx={ { borderRadius: 30 } } onClick={handlePDF}>
          PDF Export
        </Button>
        <Button variant='outlined' color="success" startIcon={<ListAltIcon/>} sx={ { borderRadius: 30 } } onClick={handleExcelExport}>
          Export XLSX
        </Button>
        <Button variant='outlined' color="warning" size="large" sx={ { borderRadius: 30 } } startIcon={<DataObjectIcon/>} onClick={handleJSON} >
          JSON
        </Button>
      </Box>
      </div>
      </div>

    </div>
  )
}

export default HalamanJenisSampah
