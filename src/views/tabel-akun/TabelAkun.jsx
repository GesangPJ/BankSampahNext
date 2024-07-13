'use client'

import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'

const TabelAkun = () => {
  const { data: session } = useSession()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ userId: '', nama: '', email: '', masterKey: '' })

  const handleClickOpen = (row) => {
    setFormData({ userId: row.id, nama: row.name, email: row.email, masterKey: '' })
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
      const response = await fetch('/api/edit-karyawan', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Data Akun Berhasil diubah')
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
          const response = await fetch(`/api/tabel-akun?userId=${session.user.id}`)
          const data = await response.json()

          const filteredData = data.filter(row => row.userType === 'KARYAWAN')

          // Tambahkan nomor urut
          const numberedData = filteredData.map((row, index) => ({ ...row, no: index + 1 }))

          setRows(numberedData)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }
  }, [session])

  const columns = [
    { field: 'no', headerName: 'No', width: 90 },
    { field: 'name', headerName: 'Nama', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <Button
        variant="contained"
        sx={{borderRadius:30}}
        color="primary"
        onClick={() => handleClickOpen(params.row)}>
          Edit
        </Button>
      ),
    },
  ]

  return (
    <div className=' max-w-[100%]'>
      <h2 className='font-bold'>
        Akun Karyawan
      </h2>
      <DataGrid
        rows={rows}
        sx={{
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Data Akun</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Masukkan data yang ingin diubah.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="nama"
            label="Nama"
            type="text"
            fullWidth
            value={formData.nama}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="masterKey"
            label="MasterKey"
            type="password"
            fullWidth
            value={formData.masterKey}
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
    </div>
  )
}

export default TabelAkun
