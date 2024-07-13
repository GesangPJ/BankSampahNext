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
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const TambahKasbon = () =>{
  const { data: session, status } = useSession()
  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if(status === 'loading') return

    if(!session){
      router.push('/error/401')
    }

    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null)
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [alert, session, status, router])

  if(!session){
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    // Validasi form sebelum mengirimkan
  if (!data.get('jumlah') || !data.get('keterangan') || !data.get('metode')) {
    setAlert('error')
    setMessage('Semua bidang harus diisi.')

    return
  }

    const formData = {
      userId : session.user.id,
      jumlah: parseInt(data.get('jumlah'), 10),
      keterangan: data.get('keterangan'),
      metode: data.get('metode')
    }

    try {
      const response = await fetch('/api/tambah-kasbon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Permintaan Kasbon berhasil dikirim!')
        formRef.current.reset() // Kosongkan form setelah berhasil didaftarkan
      } else {
        setAlert('error')
        setMessage(result.error || 'Terjadi kesalahan saat mengirim data permintaan kasbon.')
      }
    } catch (error) {
      setAlert('error')
      setMessage('Terjadi kesalahan saat mengirim data.')
    }
  }

  return(
    <div>
      <Card>
        <CardHeader title='Form Permintaan Kasbon' />
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
                  id='jumlah'
                  name='jumlah'
                  type='number'
                  fullWidth
                  label='Jumlah'
                  placeholder='Jumlah Kasbon'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i class="ri-money-dollar-circle-line"></i>
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
                  label='Keterangan'
                  placeholder='Keterangan'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i class="ri-message-2-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='metode'>Metode</InputLabel>
                  <Select
                    native
                    label='Metode'
                    defaultValue=''
                    inputProps={{
                      name: 'metode',
                      id: 'metode'
                    }}
                  >
                    {/* <option aria-label='None' value='' /> */}
                    <option value={'CASH'}>Cash</option>
                    <option value={'TRANSFER'}>Transfer</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Button variant='contained' type='submit'>
                  Kirim
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}

export default TambahKasbon
