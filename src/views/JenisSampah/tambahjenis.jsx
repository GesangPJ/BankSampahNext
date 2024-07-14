"use client"

import { useState, useEffect, useRef } from 'react'

import { useSession } from 'next-auth/react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'

const ViewTambahJenisSampah = () =>{
  const {data: session} = useSession()
  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)

  useEffect(() => {

    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null)
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }

  }, [alert])

  if (!session) {
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    const formData = {
      nama: data.get('nama'),
      adminid: session.user.id,
      harga: parseInt(data.get('harga'),10),
      keterangan: data.get('keterangan'),
    }

    try {
      const response = await fetch('/api/tambah-jenis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Jenis Sampah dikirim : ', formData)

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Jenis Sampah berhasil ditambahkan!')
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
        <CardHeader title='Tambah Jenis Sampah' />
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
                  name='nama'
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
                  label='Harga Sampah (Rp)'
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
