import NextAuth from 'next-auth';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import { verifyPassword } from '@/services/authService';
import { getUserByEmail } from '@/services/userService';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (credentials && credentials.email && credentials.password) {
                    const user = await getUserByEmail(credentials.email);
                    if (user && await verifyPassword(credentials.password, user.password)) {
                        return { id: user.id.toString(), email: user.email };
                    }
                }
                return null;
            }
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user = token;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
})

