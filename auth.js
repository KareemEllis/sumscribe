import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from '@/auth.config'
import { db } from './lib/db'
import { getUserById } from './data/user'

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log({
                user,
                account
            })
            //Allow OAuth without email verification
            if (account.provider !== 'credentials') return true

            const exisitngUser = await getUserById(user.id)

            // Prevent sign in without email verification
            if (!exisitngUser.emailVerified) return false

            //TODO: 2FA check

            return true
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            return session
        },
        async jwt({ token }) {
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig
})