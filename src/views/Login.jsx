// src/views/Login.jsx

'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { signIn } from 'next-auth/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (result.error === 'CredentialsSignin') {
      setError('Maaf Email / Password anda tidak ditemukan')
    } else if (result.error) {
      setError(result.error)
      setTimeout(() => setError(null), 5000)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12 justify-center'>
          <div className='flex flex-col gap-5'>
            <div className='items-center justify-center text-center'>
              <Typography variant='h4'><i class="ri-bank-line"></i>BANK SAMPAH NEXT</Typography>
              <Typography className='mbs-1'>Masuk Akun Anda</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <TextField
                autoFocus
                fullWidth
                label='Alamat Email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label='Password'
                id='password'
                type={isPasswordShown ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {error && <Alert severity='error'>{error}</Alert>}
              <Button fullWidth variant='contained' type='submit' sx={ { borderRadius: 30 } }>
                Masuk
              </Button>
              <Divider className='gap-3'></Divider>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
