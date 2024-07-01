import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const options: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email:{
                    label: "Email:",
                    type: "email",
                    placeholder: "hello@example.com"
                },
                password:{
                    label: "Password",
                    type: "password",
                    placeholder: "Your-password"
                },
            },
            async authorize(credentials){
                const user = {id: "45", name: "Eva", email: "eva@gmail.com"}
                if( credentials?.email === user.email){
                    return user
                }else {
                   return null
                }
            }
        })
    ],
}

const handler = NextAuth(options);

// Exportera HTTP-metoder som namngivna exports
export { handler as GET, handler as POST };
