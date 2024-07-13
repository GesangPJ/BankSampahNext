"use client"

import { useState, useEffect, useRef } from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'

const ResetPasswordAdmin = () => {
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null)
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [status])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    const email = data.get('email')
    const password = data.get('password')
    const konfirmasiPassword = data.get('konfirmasipassword')
    const masterKey = data.get('masterKey')

    if (password !== konfirmasiPassword) {
      setStatus('error')
      setMessage('Password dan konfirmasi password tidak sama.')
      formRef.current.reset()

      return
    }

    const formData = { email, password, masterKey }

    try {
      const response = await fetch('/api/reset-admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success');
        setMessage('Password Admin berhasil diganti!');
        formRef.current.reset(); // Kosongkan form setelah berhasil diganti
      } else if (response.status === 403) {
        setStatus('error');
        setMessage('Master Key salah.');
      } else {
        setStatus('error');
        setMessage(result.error || 'Terjadi kesalahan saat mengganti password.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Terjadi kesalahan saat mengganti password.');
    }
  }

  return (
    <div>
      <Card>
        <CardHeader title='Reset Password Admin' />
        <CardContent>
          {status && (
            <Alert severity={status} style={{ marginBottom: '1rem' }}>
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='email'
                  name='email'
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='Email Admin'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-mail-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='password'
                  name='password'
                  fullWidth
                  type='password'
                  label='Password'
                  placeholder='Password'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-key-2-fill' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='konfirmasipassword'
                  name='konfirmasipassword'
                  fullWidth
                  type='password'
                  label='Password'
                  placeholder='Konfirmasi Password'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-key-2-fill' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <br />
              <Grid item xs={12}>
                <TextField
                  id='masterKey'
                  name='masterKey'
                  fullWidth
                  type='password'
                  label='Master Key'
                  placeholder='Masukkan Master Key'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-key-2-fill' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Button variant='contained' type='submit'>
                  Reset Password Admin
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPasswordAdmin
