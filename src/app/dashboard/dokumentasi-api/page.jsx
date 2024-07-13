
import { Typography } from "@mui/material"

const HalamanDokumentasi = () =>{

  return(
    <div className="w-[100%]">
      <div>
        <Typography variant="h2">
          Dokumentasi API
        </Typography><br />
          <div>
            <Typography variant="h3">
            A. API Endpoint
            </Typography><br />
          </div>
          <div className=" ml-[22px] pl-[22px] text-xl">
            <ul>
              <li><code>api/auth/[...nextauth]</code>: Adalah API yang digunakan untuk autentikasi dan session akun, menggunakan Next Auth sebagai sistem Autentikasi dan Json Web Token
              (JWT) untuk mengamankan session.</li>
              <li><code>api/dashboard-admin</code>: Adalah API yang digunakan untuk mengambil data kasbon untuk dashboard Admin.</li>
              <li><code>api/dashboard-karyawan</code>: Adalah API yang digunakan untuk mengambil data kasbon sesuai nama dan ID Karyawan untuk Dashboard masing-masing Karyawan.</li>
              <li><code>api/detail-kasbon</code>: Adalah API yang digunakan untuk mengambil data kasbon sesuai dengan ID Kasbon yang diminta.</li>
              <li><code>api/edit-karyawan</code>: Adalah API yang digunakan untuk mengubah data akun Karyawan seperti nama, dan email akun Karyawan.</li>
              <li><code>api/kasbon-bayar</code>: Adalah API yang digunakan untuk mengambil data kasbon sesuai dengan Nama Karyawan yang diminta, guna mengubah status bayar.</li>
              <li><code>api/kasbon-request</code>: Adalah API yang digunakan untuk mengambil data kasbon guna mengubah status request.</li>
              <li><code>api/laporan-kasbon</code>: Adalah API yang digunakan untuk mengambil data kasbon sesuai dengan bulan dan tahun yang dipilih, guna menampilkan dan mengekspor ke format lain.</li>
              <li><code>api/registrasi</code>: Adalah API yang digunakan untuk mendaftarkan akun admin dan karyawan.</li>
              <li><code>api/reset-admin</code>: Adalah API yang digunakan untuk reset password akun admin.</li>
              <li><code>api/reset-sandi</code>: Adalah API yang digunakan untuk reset password akun karyawan.</li>
              <li><code>api/status-bayar</code>: Adalah API yang digunakan untuk mengirim perubahan status pembayaran kasbon.</li>
              <li><code>api/status-request</code>: Adalah API yang digunakan untuk mengirim perubahan status request kasbon.</li>
              <li><code>api/tabel-akun</code>: Adalah API yang digunakan untuk mengambil data Akun.</li>
              <li><code>api/tambah-kasbon</code>: Adalah API yang digunakan untuk membuat permintaan kasbon.</li>
            </ul>

          </div>

      </div>

    </div>
  )
}

export default HalamanDokumentasi
