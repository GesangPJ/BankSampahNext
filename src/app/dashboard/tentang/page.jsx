
import { Typography } from "@mui/material"

const HalamanTentang =() =>{

  return(
    <div>
      <div>
        <Typography variant="h2">
          Tentang Website
        </Typography><br />
      </div>
      <div className=" ml-[22px] pl-[22px] text-xl">
        <p>Nama Aplikasi :</p><p className="font-bold">BANK SAMPAH NEXT</p><br />
        <p>Pengembang :</p><p className="font-bold">GESANG PAUDRA JAYA, S.Kom</p><hr /><br />
        <p>Deskripsi : </p><p> Aplikasi pengelola Bank Sampah, berbasis NodeJS dengan framework Next.JS 14 Full Stack.</p>
        <p>Bahasa Pemrograman : JavaScript</p><br />
        <p>Framework : NextJS v.14.2.4</p><br />
        <p>Database : PostgreSQL 16 / SQLite 3</p><br />
        <p>Interface Components : Tailwind CSS & MUI Material UI</p><br />
      </div>

    </div>
  )
}

export default HalamanTentang
