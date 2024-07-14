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
import MenuItem from '@mui/material/MenuItem'


const KomponenTambahTransaksi = () =>{
  const { data: session, status } = useSession()
  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState('')
  const [anggota, setAnggota] = useState([])
  const [jenisSampah, setJenisSampah] = useState([])
  const formRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [anggotaResponse, jenisSampahResponse] = await Promise.all([
          fetch('/api/daftar-anggota/'),
          fetch('/api/jenis-sampah/')
        ])

        const anggotaData = await anggotaResponse.json()
        const jenisSampahData = await jenisSampahResponse.json()

        setAnggota(anggotaData)
        setJenisSampah(jenisSampahData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    if (!data.get('berat') || !data.get('keterangan') || !data.get('metode')) {
      setAlert('error')
      setMessage('Semua bidang harus diisi.')

      return
    }

    const formData = {
      adminId: session.user.id,
      userId: parseInt(data.get('anggota')),
      jenissampahid: parseInt(data.get('jenissampah')),
      berat: parseFloat(data.get('berat')),
      keterangan: data.get('keterangan'),
    }

    try {
      const response = await fetch('/api/tambah-transaksi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert('success')
        setMessage('Permintaan kasbon berhasil dikirim!')
        formRef.current.reset()
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
        <CardHeader title='Form Tambah Transaksi' />
        <CardContent>
          {alert && (
            <Alert severity={alert} style={{ marginBottom: '1rem' }}>
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="anggota">Pilih Anggota</InputLabel>
                  <Select
                    label="Pilih Anggota"
                    defaultValue=""
                    inputProps={{
                      name: 'anggota',
                      id: 'anggota'
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {anggota.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="jenissampah">Pilih Jenis Sampah</InputLabel>
                  <Select
                    label="Jenis Sampah"
                    defaultValue=""
                    inputProps={{
                      name: 'jenissampah',
                      id: 'jenissampah'
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {jenisSampah.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.namajenissampah}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="berat"
                  name="berat"
                  type="number"
                  fullWidth
                  label="Berat"
                  placeholder="Berat Sampah (Kg)"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="ri-weight-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="keterangan"
                  name="keterangan"
                  fullWidth
                  label="Keterangan"
                  placeholder="Keterangan"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="ri-message-2-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Button variant="contained" type="submit">
                  Tambah Transaksi
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}

export default KomponenTambahTransaksi
