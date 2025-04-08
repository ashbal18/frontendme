import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "./axios";


export const { auth, handlers, signIn, signOut} = NextAuth({
    providers:[
        Credentials({
            credentials:{
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (Credentials) => {
                const {data} = await axios.post("/auth/login", Credentials);
                if (!data) {
                    throw new Error ("Invalid credentials");
                }
                return { ...data.data, access_token: data.access_token };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, 
    },
    callbacks: {
        signIn: async () => {
            return true;
        },
        session: async ({ token, session }) => {
            session.user = { ...session.user, ...token, email: token.email || "" };
            return session;
        },
        jwt: async ({ token, user }) => {
            token = { ...token, ...user};
            return token;
        },
    },
});