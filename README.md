![Vercel](https://vercelbadge.vercel.app/api/GesangPJ/KasbonManajer?style=for-the-badge)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

# KASBON MANAJER

Aplikasi Manajemen Kasbon pengembangan lebih lanjut dari versi sebelumnya (Kasbon-JS),
menggunakan NextJS 14 Full Stack dengan Database PostgreSQL atau SQLite (akan tersedia di Branch lain).

https://github.com/GesangPJ/KasbonManajer/assets/26625652/bd2fe23c-ba7d-4281-9fc3-c162a7805261

## Fitur Website

1. App Router.
2. Next-Auth untuk Autentikasi.
3. Json Web Token (JWT) untuk mengamankan session.
4. MUI DataGrid untuk penyajian data lebih baik.
5. Multi-Role account, akun terbagi menjadi 2 tipe : Admin dan Karyawan.
6. Bcrypt untuk password hashing.
7. API Protection menggunakan JWT Token Validation.
8. Pages protection menggunakan session.
9. Admin Master Key autentikasi bagi admin untuk mengganti password akun dan data akun.

## Fitur Kasbon

1. Dashboard (Admin & Karyawan).
2. Form tambah kasbon (Karyawan).
3. Halaman Status Request.
4. Halaman Status Bayar.
5. Export kasbon ke PDF, Excel, JSON.
6. Mengambil Laporan Kasbon per Bulan.
7. Menampilkan jumlah total nilai kasbon yang diminta, yang telah disetujui, yang telah lunas, yang belum lunas.
8. Halaman Bantuan yang berisi penjelasan setiap halaman dan bagaimana cara mengirim dan menampilkan data.
9. Edit Data Akun Karyawan.
10. Edit Data Akun Admin.
11. Reset Password Akun Karyawan.
12. Reset Password Akun Admin.

# Container Deploy

Docker compose sudah tersedia. Gunakan sesuai versi image (PostgreSQL / SQLite)
jangan lupa dengan environment variables yang ada.

## Container Image

Container Image tersedia di repository package (ghcr.io)

- kasbon-manager-pg : adalah versi dengan PostgreSQL
- kasbon-manager-sqlite : adalah versi dengan SQLite

## SQLite Version

Versi SQLite tersedia di branch "SQLiteVersion"

file database SQLite berada di `/prisma/dev.db`

buka `schema.prisma` untuk mengganti koneksi dan schema.

Dengan menggunakan versi SQLite ini maka tidak perlu install database lain seperti PostgreSQL atau MySQL.

## Instalasi

### Install PostgreSQL Version

1. Clone repository ini.
2. Buka folder repository di pc local anda.
3. Ubah file `.env.example` >> `.env`
4. Isi nilai `NEXTAUTH_SECRET` dengan menggunakan `openssl rand -base64 32` untuk generate secret key dan copy ke `NEXTAUTH_SECRET`
5. Isi nilai `NEXTAUTH_URL` dengan `http://localhost:3000` jika dijalankan di local pc, atau domain lain jika dijalankan di hosting / cloud.
6. Buka `schema.prisma` , jika anda menggunakan PostgreSQL secara lokal maka ganti nilai `url=` dengan `env("DATABASE_URL")`
7. Kemudian Isi `DATABASE_URL` dengan contoh nilai : `postgresql://<nama akun>:<password>@localhost:<port>/<nama database>`
8. Jika menggunakan PostgreSQL dari Vercel, maka ganti nilai `url=` dengan `env("POSTGRES_PRISMA_URL")` dan tambahkan `directUrl = env("POSTGRES_URL_NON_POOLING")` dibawahnya.
9. Kemudian isi nilai `POSTGRES_PRISMA_URL` di file `.env` dengan URL dari PostgreSQL di Vercel, begitu juga dengan nilai `POSTGRES_URL_NON_POOLING`
10. Isi nilai `ADMIN_KEY` dengan secret key anda sendiri (ini digunakan agar admin dapat mengganti nama / email / password akun lainnya.)
11. Setelah semua terisi dan benar. maka jalankan `npm install`.
12. Kemudian jalankan `npx prisma migrate deploy`.
13. Kemudian jalankan `npx prisma generate`.
14. Setelah selesai maka jalankan `npm run seedadmin` untuk membuat akun admin.
15. Kemudian jalankan `npm run seedkaryawan` untuk membuat akun karyawan.
16. Email dan Password dari kedua akun dapat dilihat dan diganti di `/prisma/seedAdmin.js` dan `/prisma/seedKaryawan.js`.
17. Kemudian Build project dengan menjalankan `npm run build`.

### Install SQLite Version

1. Clone repository branch `SQLiteVersion`
2. Buka folder repository di pc local anda.
3. Ubah file `.env.example` >> `.env`.
4. Isi nilai `NEXTAUTH_SECRET` dengan menggunakan `openssl rand -base64 32` untuk generate secret key dan copy ke `NEXTAUTH_SECRET`.
5. Isi nilai `NEXTAUTH_URL` dengan `http://localhost:3000` jika dijalankan di local pc, atau domain lain jika dijalankan di hosting / cloud.
6. Buka `schema.prisma` dan pastikan bahwa `provider = "sqlite"` dan `url = "file:./dev.db"` ini berarti Prisma menggunakan SQlite sebagai database dan file database terletak di `/prisma/dev.db`.
7. Isi nilai `ADMIN_KEY` dengan secret key anda sendiri (ini digunakan agar admin dapat mengganti nama / email / password akun lainnya.)
8. Setelah semua terisi dan benar. maka jalankan `npm install`.
9. Kemudian jalankan `npx prisma migrate deploy`.
10. Kemudian jalankan `npx prisma generate`.
11. Setelah selesai maka jalankan `npm run seedadmin` untuk membuat akun admin.
12. Kemudian jalankan `npm run seedkaryawan` untuk membuat akun karyawan.
13. Email dan Password dari kedua akun dapat dilihat dan diganti di `/prisma/seedAdmin.js` dan `/prisma/seedKaryawan.js`.
14. Kemudian Build project dengan menjalankan `npm run build`.

## Changelog

### v.1.3.1 Update Patch #5

- Edit Data Admin
- Edit Data Admin API
- Refactor some codes
- Remove Unnecessary files

### v.1.2.7 Update Patch #4

- Add Bantuan page.
- Add Dokumentasi API page.
- Add Tentang Page.
- Sidebar Update.
- Refactor some codes.

### v.1.1.8 Update Patch #3

- Add more page protection.
- Refactor some codes.
- Remove unused files.

### v.1.1.7 Update Patch #2

- Add Reset Password for Karyawan.
- Add Reset Password for Admin.
- Add master Key validation for Admin password reset.

### v.1.0.10 Update Patch #1

- Fix API Endpoint protection error.
- Refactor some codes.

### v.1.0.7PG-Release

- Rilis pertama.
- PostgreSQL Version.
- Semua fitur kasbon (tambah, ganti status, ambil laporan perbulan, export ke pdf ; excel ; json).
