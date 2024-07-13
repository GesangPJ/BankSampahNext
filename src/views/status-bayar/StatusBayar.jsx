'use client'

import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Box, ButtonGroup, Snackbar, Alert } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'

const getStatusChip = (status) => {
  switch (status) {
    case 'BELUM':
      return <Chip label="BELUM" color="warning" variant="outlined" icon= {<WarningAmberIcon/>} />
    case 'SETUJU':
      return <Chip label="SETUJU" color="success" variant="outlined" icon= {<CheckCircleOutlineIcon/>} />
    case 'TOLAK':
      return <Chip label="DITOLAK" color="error" variant="outlined"  icon= {<HighlightOffIcon/>} />
    default:
      return <Chip label="UNKNOWN" color="default" variant="outlined" />
  }
}

const getBayarChip = (status) => {
  switch (status) {
    case 'BELUM':
      return <Chip label="BELUM" color="error" variant="outlined" icon= {<ErrorOutlineIcon/>} />
    case 'LUNAS':
      return <Chip label="LUNAS" color="success" variant="outlined" icon= {<CheckCircleOutlineIcon/>} />
    default:
      return <Chip label="UNKNOWN" color="default" variant="outlined" />
  }
}

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text
  }

  return text.slice(0, maxLength) + '...'
}

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

const StatusBayar = () => {
  const { data: session } = useSession()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('success')
  const [namaKaryawan, setNamaKaryawan] = useState('')

  const adminId = session?.user?.id

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch('/api/status-bayar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kasbonId: id, status_b: status, adminId }),
      })

      if (response.ok) {
        setAlertMessage(`Status berhasil diubah menjadi ${status}`)
        setAlertSeverity('success')
        fetchData() // Refresh data after status change
      } else {
        const data = await response.json()

        setAlertMessage(`Gagal mengubah status: ${data.error}`)
        setAlertSeverity('error')
      }
    } catch (error) {
      setAlertMessage(`Terjadi kesalahan: ${error.message}`)
      setAlertSeverity('error')
    } finally {
      setAlertOpen(true)
    }
  }

  const fetchData = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/kasbon-bayar?namaKaryawan=${encodeURIComponent(namaKaryawan)}`)
      const data = await response.json()

      // Tambahkan nomor urut
      const numberedData = data.map((row, index) => ({ ...row, no: index + 1 }))

      setRows(numberedData)
    } catch (error) {
      console.error('Error mengambil data:', error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    if (session) {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const columns = [
    { field: 'no', headerName: 'No', width: 50 },
    {
      field: 'updatedAt',
      headerName: 'Tanggal/Jam',
      headerClassName: 'app-theme--header',
      width: 150,
      renderCell: (params) => <div>{formatDate(params.value)}</div>,
    },
    {
      field: 'namaKaryawan',
      headerName: 'Nama',
      headerClassName: 'app-theme--header',
      width: 160,
    },
    {
      field: 'jumlah',
      headerName: 'Jumlah',
      headerClassName: 'app-theme--header',
      width: 100,
      renderCell: (params) => <div>{formatCurrency(params.value)}</div>,
    },
    {
      field: 'status_r',
      headerName: 'Status Request',
      headerClassName:'app-theme--header',
      width: 160,
      renderCell: (params) => getStatusChip(params.value),
    },
    {
      field: 'status_b',
      headerName: 'Status Bayar',
      headerClassName:'app-theme--header',
      width: 160,
      renderCell: (params) => getBayarChip(params.value),
    },
    { field: 'metode', headerName: 'Metode', headerClassName: 'app-theme--header', width: 100 },
    {
      field: 'keterangan',
      headerName: 'Keterangan',
      headerClassName: 'app-theme--header',
      width: 150,
      renderCell: (params) => <div>{truncateText(params.value, 40)}</div>,
    },
    {
      field: 'Status',
      headerName: 'Status Bayar',
      headerClassName: 'app-theme--header',
      width: 300,
      renderCell: (params) => (
        <ButtonGroup disableElevation variant="contained" aria-label="Button group">
          <Button
            id="LUNAS"
            variant="outlined"
            color="success"
            startIcon={<CheckCircleOutlineIcon />}
            onClick={() => handleStatusChange(params.row.id, 'LUNAS')}
          >
            LUNAS
          </Button>
          <Button
            id="BELUM"
            color="error"
            variant="outlined"
            startIcon={<HighlightOffIcon />}
            onClick={() => handleStatusChange(params.row.id, 'BELUM')}
          >
            BELUM
          </Button>
        </ButtonGroup>
      ),
    },
  ]

  return (
    <div>
      <div>
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
          <TextField
            id="namaKaryawan"
            label="Nama Karyawan"
            variant="outlined"
            name="namaKaryawan"

            // helperText="Masukkan Nama Karyawan"
            value={namaKaryawan}
            onChange={(e) => setNamaKaryawan(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            size="large"
            onClick={fetchData}
          >
            CARI DATA KARYAWAN
          </Button>

        </Box>
      </div>
      <br />
      <hr />
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
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={() => setAlertOpen(false)}
          >
            <Alert
              onClose={() => setAlertOpen(false)}
              severity={alertSeverity}
              sx={{ width: '100%' }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
      </div>
    </div>
  )
}

export default StatusBayar
