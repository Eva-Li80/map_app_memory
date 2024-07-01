import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client"; // Importera PrismaClient

const prisma = new PrismaClient(); // Skapa en instans av PrismaClient

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
                if( !credentials?.email || !credentials.password){
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user){
                    console.log("User not found:", credentials.email); // Lägg till denna loggning
                    return null
                }

                const isPasswordValid = await compare(
                    credentials.password,
                    user.password
                )

                if(!isPasswordValid){
                    console.log("Invalid password for user:", credentials.email); // Lägg till denna loggning
                    return null
                }

                console.log("User authenticated:", user.email); // Lägg till denna loggning

                return {
                    id: user.id + "",
                    email: user.email,
                    name: user.name,
                    // posts: user.posts
                }
            }
        })
    ],
}

const handler = NextAuth(options);

// Exportera HTTP-metoder som namngivna exports
export { handler as POST, handler as GET, handler as OPTIONS }; // Exportera OPTIONS här
