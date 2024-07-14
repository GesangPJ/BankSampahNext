"use client"

import { useState, useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'

const ViewTambahJenisSampah = () =>{
  const {data: session, status} = useSession()
  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)
  const router = useRouter()

  useEffect(() => {

  }, [])

  if (!session) {
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    const formData = {
      name: data.get('nama'),
      harga: data.get('harga'),
      keterangan: data.get('keterangan'),
      adminId: session.user.id,
    }

    try {
      const response = await fetch('/api/tambah-jenis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Akun berhasil didaftarkan!')
        formRef.current.reset() // Kosongkan form setelah berhasil didaftarkan
      } else {
        setAlert('error')
        setMessage(result.error || 'Terjadi kesalahan saat mendaftarkan akun.')
      }
    } catch (error) {
      setAlert('error')
      setMessage('Terjadi kesalahan saat mendaftarkan akun.')
    }
  }

  return(
    <div>
      <Card>
        <CardHeader title='Registrasi Akun' />
        <CardContent>
          {alert && (
            <Alert severity={alert} style={{ marginBottom: '1rem' }}>
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={5}>
            <Grid item xs={12}>
                <TextField
                  id='nama'
                  name='name'
                  fullWidth
                  label='Nama'
                  placeholder='Nama Jenis Sampah'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i class="ri-recycle-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='harga'
                  name='harga'
                  fullWidth
                  type='number'
                  label='Harga Sampah'
                  placeholder='Harga Sampah per Kg'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i class="ri-price-tag-3-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='keterangan'
                  name='keterangan'
                  fullWidth
                  type='text'
                  label='Keterangan'
                  placeholder='Masukkan Keterangan'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i class="ri-information-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Button variant='contained' type='submit' color='success' sx={{borderRadius:30}}>
                  Tambah
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ViewTambahJenisSampah