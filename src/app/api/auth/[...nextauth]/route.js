// NextAuth. Lokasi : /src/app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'

import prisma from '@/app/lib/prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user
        }

        // Jika autentikasi gagal, kirim pesan kesalahan
        throw new Error('Maaf Email / Password anda tidak ditemukan')
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60, // Set JWT hanya 24 Jam
  },
  pages: {
    signIn: '/', // tentukan halaman login
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.userType = user.userType
      }

      return token
    }, // Menyiapkan session untuk ditampilkan di halaman / komponen
    async session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      session.user.userType = token.userType

      return session
    }
  }
}

export const GET = NextAuth(authOptions)
export const POST = NextAuth(authOptions)
