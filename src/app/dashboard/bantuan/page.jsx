
import { Typography } from "@mui/material"
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

const HalamanBantuan = () =>{

  return(
    <div>
      <div className=" justify-center items-center ">
        <Box sx={{ width: '100%'}} >
          <Typography variant="h2" sx={{fontWeight:'bold'}}>
            Halaman Bantuan
          </Typography>
          <Divider/>
          <br />
          <Typography variant="h3">
            A. Menambahkan Kasbon
          </Typography><br />
          <div className="ml-[22px] pl-[22px] text-xl">
            <ol type="number">
              <li>Karyawan Login.</li>
              <li>Sidebar &gt; Menu Kasbon &gt; Tambah Kasbon.</li>
              <li>Masukkan jumlah permintaan kasbon.</li>
              <li>Masukkan Keterangan Kasbon.</li>
              <li>Masukkan Metode Pembayaran Kasbon : <code>&quot;TRANSFER&quot; / &quot;CASH&quot;</code></li>
              <li>Jika data yang dimasukkan sudah benar maka klik tombol <code>KIRIM</code></li>
            </ol>
          </div>
          <br />
          <Typography variant="h3">
            B. Dashboard
          </Typography><br />
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Adalah halaman yang berisi tabel data Kasbon, untuk Karyawan, data kasbon adalah
              data milik masing-masing karyawan untuk Admin, dashboard berisi data semua kasbon yang masuk, yang terdiri dari :</p>
              <ol type="number">
                <li><code>tanggal / jam :</code> Berisi data tanggal dan jam dimana data kasbon terakhir diubah.</li>
                <li><code>nama :</code> Adalah nama Karyawan terdaftar yang meminta Kasbon.</li>
                <li><code>jumlah :</code> Berisi Jumlah nilai Kasbon yang diminta.</li>
                <li><code>status request :</code> Berisi keterangan status permintaan, seperti : &quot;BELUM&quot; ; &quot;SETUJU&quot; ; &quot;DITOLAK&quot; </li>
                <li><code>status bayar :</code> Berisi keterangan status pembayaran kasbon, seperti : &quot;BELUM&quot; ; &quot;LUNAS&quot;</li>
                <li><code>keterangan :</code> Adalah keterangan atau alasan mengenai permintaan kasbon, kenapa karyawan meminta kasbon sebesar jumlah yang diminta.</li>
                <li><code>metode :</code> Adalah metode yang dipilih oleh Karyawan untuk membayar kasbon, seperti : &quot;TRANSFER&quot; ; &quot;CASH&quot;</li>
                <li><code>admin :</code> Adalah nama Admin / Petugas yang mengubah status kasbon, nama yang ditampilkan adalah nama admin terbaru yang mengubah data status kasbon.</li>
                <li><code>detail :</code> Adalah tombol yang digunakan untuk melihat Detail Kasbon ketika diklik / ditekan.</li>
              </ol><br />
              <p>Didalam Dashboard terdapat beberapa tombol, berikut adalah daftar tombol beserta dengan fungsinya :</p>
            <ul>
              <li>Tombol <code>PDF Export :</code> Digunakan untuk ekspor / download data kasbon ke format PDF.</li>
              <li>Tombol <code>Export XLSX :</code> Digunakan untuk ekspor / download data kasbon ke format Excel.</li>
              <li>Tombol <code>JSON : </code> Digunakan untuk ekspor / download data kasbon ke format JSON.</li>
            </ul>
          </div><br />
          <Typography variant="h3">
            C. Request Kasbon
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Adalah halaman yang digunakan oleh Admin untuk menentukan Status Request / permintaan Kasbon, halaman ini berisi tabel permintaan kasbon terbaru dengan status request awal &quot;BELUM&quot; . Kemudian admin akan menentukan apakah permintaan kasbon ini DISETUJUI atau DITOLAK dengan menekan salah satu tombol &quot;SETUJU&quot; atau &quot;TOLAK&quot;</p>
          </div><br />
          <Typography variant="h3">
            D. Konfirmasi Bayar
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Adalah halaman yang digunakan oleh Admin untuk menentukan Status Bayar / pembayaran kasbon, berikut dibawah ini cara untuk merubah status bayar kasbon :</p>
            <ol type="number">
              <li>Masukkan Nama Karyawan di Input Nama.</li>
              <li>Tekan tombol <code>CARI</code>.</li>
              <li>Kemudian data kasbon Karyawan yang anda cari akan muncul di tabel bawah.</li>
              <li>Jika data kasbon tidak muncul, maka Kasbon Karyawan tersebut semuanya dalam status DITOLAK atau anda salah mengetik nama Karyawan.</li>
              <li>Jika data karyawan ditampilkan maka anda bisa memilih Kasbon mana yang sudah lunas, maka anda klik tombol <code>LUNAS</code></li>
              <li>Anda juga bisa mengganti status LUNAS menjadi BELUM dengan menekan tombol <code>BELUM</code></li>
            </ol>
          </div><br />
          <Typography variant="h3">
            E. Ekspor Laporan
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Adalah halaman yang digunakan untuk mengambil data kasbon per bulan dan tahun yang kemudian dapat diekspor / didownload ke berbagai format yang disediakan. Berikut dibawah ini adalah cara ekspor data :</p>
            <ol type="number">
              <li>Klik Ikon Kalender untuk menampilkan dialog Bulan dan Tahun / Ketik tahun dan bulan dalam format &quot;TAHUN-BULAN&quot;.</li>
              <li>Untuk memilih tahun lainnya lewat dialog, klik tanda panah kebawah maka akan muncul daftar tahun.</li>
              <li>Jika Bulan dan tahun telah dipilih / diketik, maka klik tombol <code>CARI DATA</code></li>
              <li>Kemudian data kasbon untuk bulan dan tahun yang dipilih akan ditampilkan ditabel bawah.</li>
              <li>Klik tombol <code>PDF Export</code> untuk download data kasbon dalam format PDF.</li>
              <li>Klik tombol <code>Export XLSX</code> untuk download data kasbon dalam formal Excel.</li>
              <li>Klik tombol <code>JSON</code> untuk download data kasbon dalam format JSON.</li>
            </ol>
          </div><br />
          <Typography variant="h3">
            F. Ganti Data Akun Karyawan
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Berikut dibawah ini adalah cara bagaimana untuk mengganti data akun karyawan, data yang bisa diganti adalah nama dan email akun :</p>
            <ol type="number">
              <li>Pada sidebar klik Manajemen Akun.</li>
              <li>Klik Tabel Akun.</li>
              <li>Pada Tabel Akun Karyawan, lihat akun mana yang akan anda ganti datanya, kemudian klik tombol <code>EDIT</code> sesuai dengan baris akun yang ingin diganti datanya.</li>
              <li>Pada dialog box yang muncul, jika nama yang diganti maka hapus nama awal kemudian ketik nama yang baru.</li>
              <li>Pada dialog box yang muncul, jika email yang diganti maka hapus email awal kemudian ketik email yang baru.</li>
              <li>Ketik MasterKEY yang disimpan di <code>ENVIRONMENT</code> website.</li>
              <li>Jika dirasa data yang diganti sudah benar maka klik tombol <code>KIRIM</code>.</li>
              <li>Jika tidak maka keluar dengan klik tombol <code>BATAL</code>.</li>
            </ol>
          </div><br />
          <Typography variant="h3">
            G. Registrasi Akun
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Berikut dibawah ini adalah bagaimana cara mendaftarkan akun untuk Admin dan atau Karyawan :</p>
            <ol type="number">
              <li>Pada sidebar, klik Manajemen Akun.</li>
              <li>Kemudian klik Registrasi Akun.</li>
              <li>Kemudian masukkan nama di kolom <code>Nama Akun</code>.</li>
              <li>Kemudian masukkan email di kolom <code>Email Akun</code>.</li>
              <li>Kemudian masukkan password akun di kolom <code>Password</code>.</li>
              <li>Kemudian pilih tipe akun, &quot;ADMIN&quot; atau &quot;KARYAWAN&quot;.</li>
              <li>Lihat kembali data yang anda masukkan, jika sudah benar maka klik tombol <code>DAFTAR</code></li>
            </ol>
          </div><br />
          <Typography variant="h3">
            H. Reset Password Akun Karyawan
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Berikut dibawah ini adalah bagaimana cara mengganti password akun karyawan :</p>
            <ol type="number">
              <li>Pada sidebar, klik Manajemen Akun.</li>
              <li>Kemudian klik Reset Password Akun.</li>
              <li>Masukkan email akun karyawan di kolom <code>Email Karyawan</code>.</li>
              <li>Masukkan Password yang baru di kolom <code>Password</code>.</li>
              <li>Masukkan kembali password yang baru di kolom <code>Konfirmasi Password</code>.</li>
              <li>Jika data sudah benar maka klik tombol <code>Reset Password</code>.</li>
            </ol>
          </div><br />
          <Typography variant="h3">
            I. Reset Password Akun Admin
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Berikut dibawah ini adalah bagaimana cara mengganti password akun admin :</p>
            <ol type="number">
              <li>Pada sidebar, klik Manajemen Akun.</li>
              <li>Kemudian klik Reset Password Akun.</li>
              <li>Masukkan Email Akun Admin di kolom <code>Email Admin</code>.</li>
              <li>Masukkan Password admin yang baru di kolom <code>Password</code>.</li>
              <li>Masukkan kembali passsword yang baru di kolom <code>Konfirmasi Password</code>.</li>
              <li>Masukkan kode MasterKEY di kolom <code>Master Key</code>.</li>
              <li>Jika data sudah benar, maka klik tombol <code>Reset Password Admin</code>.</li>
            </ol>
          </div><br />
          <Divider />
          <br />
          <Typography variant="h3" sx={{fontWeight:'bold'}}>
            Daftar Error
          </Typography><br />
          <Divider /><br />
          <div className="ml-[22px] pl-[22px] text-xl">
          <p>Berikut dibawah ini adalah daftar error yang kemungkinan muncul beserta dengan penjelasan dan cara menanganinya :</p>
          <ul>
          <li><code className="text-red-600">MasterKEY Salah</code>: Master Key yang dimasukkan tidak sesuai dengan yang ada, cek kembali apakah master key yang dimasukkan sama dengan yang ada di <code>Environment Variable</code> website.</li>
          <li><code className="text-red-600">Data Tidak Boleh Kosong</code>: Terdapat kolom yang kosong disaat akan mengirim / menyimpan data, cek kembali kolom mana yang kosong.</li>
          <li><code className="text-red-600">Tidak Ada Data</code>: Data tidak ditemukan.</li>
          <li><code className="text-red-600">No Rows</code>: Data tidak ditemukan.</li>
          <li><code className="text-red-600">Gagal Menambahkan / Mengirim Data</code>: Terjadi kesalahan saat akan mengirim / menyimpan data, pastikan database terkoneksi dengan baik, jika anda menggunakan PostgreSQL pastika server PostgreSQL masih berjalan, atau pastikan anda masih terhubung ke internet.</li>

          </ul>

          </div>


        </Box>
      </div>
    </div>
  )
}

export default HalamanBantuan
