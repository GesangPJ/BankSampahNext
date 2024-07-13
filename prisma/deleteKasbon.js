import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Delete all rows from the Kasbon table
    await prisma.kasbon.deleteMany({})

    console.log('Berhasil menghapus semua data di tabel Kasbon.')

  } catch (error) {
    console.error('Error deleting rows:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
.catch((e) => {
  console.error(e)
  process.exit(1)
})
