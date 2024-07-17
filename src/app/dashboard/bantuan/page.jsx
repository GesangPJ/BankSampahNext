
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
            A. Menambahkan Jenis Sampah
          </Typography><br />
          <div className="ml-[22px] pl-[22px] text-xl">
            <ol type="number">
              <li>Pada Sidebar pilih Menu <code>Sampah</code> kemudian pilih <code>Tambah Jenis Sampah</code>.</li>
              <li>Masukkan nama jenis sampah pada kolom <code>Nama Jenis Sampah</code>.</li>
              <li>Masukkan harga jenis sampah tersebut di kolom <code>Harga Sampah</code>.</li>
              <li>Masukkan informasi mengenai jenis sampah tersebut di kolom <code>Keterangan</code></li>
              <li>Jika data yang dimasukkan sudah benar maka klik tombol <code>Tambah</code></li>
            </ol>
          </div>
          <br />
          <Typography variant="h3">
            B. Dashboard
          </Typography><br />
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Adalah halaman yang berisi tabel data Transaksi Sampah, untuk anggota, data transaksi adalah
              data milik masing-masing anggota, untuk Admin, dashboard berisi data semua transaksi yang dibuat, yang terdiri dari :</p>
              <ol type="number">
                <li><code>tanggal / jam :</code> Berisi data tanggal dan jam dimana data transaksi dibuat.</li>
                <li><code>nama anggota :</code> Adalah nama Anggota terdaftar yang telah melakukan transaksi penjualan sampah.</li>
                <li><code>sampah :</code> Berisi jenis sampah yang dijual oleh anggota.</li>
                <li><code>harga :</code> Berisi nilai jual jenis sampah disaat transaksi dilakukan.</li>
                <li><code>berat (Kg) :</code> Berisi nilai berat sampah yang dijual ketika melakukan transaksi.</li>
                <li><code>harga total :</code> Adalah nilai harga total dimana anggota menerima pembayaran sesuai dengan nilai berat dikali dengan harga jenis sampah ketika transaksi dilakukan.</li>
                <li><code>keterangan :</code> Adalah informasi tambahan yang dimasukkan oleh admin ketika transaksi dibuat.</li>
                <li><code>admin :</code> Adalah nama Admin / Petugas yang membuat dan memasukkan data transaksi penjualan sampah.</li>
                <li><code>detail :</code> Adalah tombol yang digunakan untuk melihat Detail transaksi sampah ketika diklik / ditekan.</li>
              </ol><br />
              <p>Didalam Dashboard terdapat beberapa tombol, berikut adalah daftar tombol beserta dengan fungsinya :</p>
            <ul>
              <li>Tombol <code>PDF Export :</code> Digunakan untuk ekspor / download data transaksi ke format PDF.</li>
              <li>Tombol <code>Export XLSX :</code> Digunakan untuk ekspor / download data transaksi ke format Excel.</li>
              <li>Tombol <code>JSON : </code> Digunakan untuk ekspor / download data transaksi ke format JSON.</li>
            </ul>
          </div><br />
          <Typography variant="h3">
            C. Tambah Transaksi
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Adalah halaman yang digunakan oleh Admin untuk membuat transaksi penjualan sampah, berikut dibawah ini adalah bagaimana cara membuat transaksi penjualan sampah :</p>
            <ol type="number">
              <li>Buka halaman transaksi sampah dengan klik sidebar dan pilih menu <code>Sampah</code> kemudian klik menu <code>Tambah Transaksi</code>.</li>
              <li>Pilih Anggota dengan klik menu <code>Pilih Anggota *</code> kemudian klik nama dari salah satu anggota yang akan melakukan transaksi penjualan sampah.</li>
              <li>Pilih jenis sampah dengan klik menu <code>Pilih Jenis Sampah *</code> kemudian klik nama dari salah satu jenis sampah.</li>
              <li>Masukkan berat dari jenis sampah tersebut ke kolom <code>Berat Sampah (Kg)</code> masukkan dalam format kilogram (Kg).</li>
              <li>Masukkan informasi tambahan jika ada ke kolom <code>keterangan</code>.</li>
              <li>Pastikan semua data sudah benar, kemudian klik tombol <code>Tambah Transaksi</code></li>
            </ol>
          </div><br />
          <Typography variant="h3">
            D. Jenis Sampah
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Adalah halaman yang berisi tabel data mengenai jenis sampah yang diterima di bank sampah beserta dengan nilai harga terbaru dari jenis sampah tersebut.</p>
          </div><br />
          <Typography variant="h3">
            E. Ekspor Laporan
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Adalah halaman yang digunakan untuk mengambil data transaksi sampah per bulan dan tahun yang kemudian dapat diekspor / didownload ke berbagai format yang disediakan. Berikut dibawah ini adalah cara ekspor data :</p>
            <ol type="number">
              <li>Klik Ikon Kalender untuk menampilkan dialog Bulan dan Tahun / Ketik tahun dan bulan dalam format &quot;TAHUN-BULAN&quot;.</li>
              <li>Untuk memilih tahun lainnya lewat dialog, klik tanda panah kebawah maka akan muncul daftar tahun.</li>
              <li>Jika Bulan dan tahun telah dipilih / diketik, maka klik tombol <code>CARI DATA</code></li>
              <li>Kemudian data transaksi untuk bulan dan tahun yang dipilih akan ditampilkan ditabel bawah.</li>
              <li>Klik tombol <code>PDF Export</code> untuk download data transaksi dalam format PDF.</li>
              <li>Klik tombol <code>Export XLSX</code> untuk download data transaksi dalam formal Excel.</li>
              <li>Klik tombol <code>JSON</code> untuk download data transaksi dalam format JSON.</li>
            </ol>
          </div><br />
          <Typography variant="h3">
            F. Ganti Data Akun Anggota
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Berikut dibawah ini adalah cara bagaimana untuk mengganti data akun Anggota, data yang bisa diganti adalah nama dan email akun :</p>
            <ol type="number">
              <li>Pada sidebar klik Manajemen Akun.</li>
              <li>Klik Tabel Akun.</li>
              <li>Pada Tabel Akun Anggota, lihat akun mana yang akan anda ganti datanya, kemudian klik tombol <code>EDIT</code> sesuai dengan baris akun yang ingin diganti datanya.</li>
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
            <p>Berikut dibawah ini adalah bagaimana cara mendaftarkan akun untuk Admin dan atau Anggota :</p>
            <ol type="number">
              <li>Pada sidebar, klik Manajemen Akun.</li>
              <li>Kemudian klik Registrasi Akun.</li>
              <li>Kemudian masukkan nama di kolom <code>Nama Akun</code>.</li>
              <li>Kemudian masukkan email di kolom <code>Email Akun</code>.</li>
              <li>Kemudian masukkan password akun di kolom <code>Password</code>.</li>
              <li>Kemudian pilih tipe akun, &quot;ADMIN&quot; atau &quot;Anggota&quot;.</li>
              <li>Lihat kembali data yang anda masukkan, jika sudah benar maka klik tombol <code>DAFTAR</code></li>
            </ol>
          </div><br />
          <Typography variant="h3">
            H. Reset Password Akun Anggota
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Berikut dibawah ini adalah bagaimana cara mengganti password akun Anggota :</p>
            <ol type="number">
              <li>Pada sidebar, klik Manajemen Akun.</li>
              <li>Kemudian klik Reset Password Akun.</li>
              <li>Masukkan email akun Anggota di kolom <code>Email Anggota</code>.</li>
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
