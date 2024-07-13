// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const email = 'karyawan0@email.com'
  const password = 'karyawan0123'
  const name = 'Karyawan 0'
  const userType = 'KARYAWAN'

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType,
      },
    })

    console.log('Admin user created:', user)
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
