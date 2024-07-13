
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
        <p>Nama Website 1 :</p><p className="font-bold"> KASBON MANAGER</p><br />
        <p>Nama Website 2 :</p><p className="font-bold"> KASBON MANAJER</p><br />
        <p>Pengembang :</p><p className="font-bold">GESANG PAUDRA JAYA, S.Kom</p><hr /><br />
        <p>Bahasa Pemrograman : JavaScript</p><br />
        <p>Framework : NextJS v.14.2.3</p><br />
        <p>Database : PostgreSQL 16 / SQLite 3</p>
        <p>User Interface : Tailwind & MUI Material UI</p><br />

      </div>

    </div>
  )
}

export default HalamanTentang
