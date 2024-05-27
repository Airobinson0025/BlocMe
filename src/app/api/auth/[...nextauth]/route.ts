import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/services/authService";
import { getUserByEmail } from "@/services/userService";
import { User } from "@/types/types";


export const authOptions: AuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await getUserByEmail(credentials.email);
                if (user && await verifyPassword(credentials.password, user.password)) {
                    return { id: String(user.id), email: user.email} as User;
                }
                return null;
            }
        })
    ],
    session: {
        strategy: 'jwt' as SessionStrategy,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user.id = token.id;

            console.log('Session Informaion:', session);

            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
}


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST}

