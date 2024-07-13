'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const UnAuthorized = () => {

  return (
    <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden bg-black'>
      <div className='flex items-center flex-col text-center gap-10'>
        <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset]'>
          <Typography variant='h1' className=' font-extrabold text-8xl' color='error'>
            401
          </Typography>
          <br />
          <Typography variant='h4' className='text-3xl font-extrabold' color='yellow'>Unauthorized</Typography>
          <br />
          <Typography color='white'>Anda tidak memiliki izin untuk mengakses halaman ini, silahkan login.</Typography>
          <Typography color='white'>Sorry, you do not have credentials to access this page, please login first.</Typography>
        </div>
        <Button href='/' component={Link} variant='contained'>
          &laquo; Login
        </Button>
      </div>
    </div>
  )
}

export default UnAuthorized
