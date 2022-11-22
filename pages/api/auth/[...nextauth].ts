import bcrypt from "bcrypt";
import db from "db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProviders({
      type: "credentials",
      credentials: {},
      async authorize(
        credentials: { email: string; password: string },
        req: any
      ) {
        const user = await db.query(
          "SELECT name, email, password, id, cell_phone, id_card_picture, username, created_at, verified  FROM users WHERE email = $1",
          [credentials.email]
        );
        // if it returns a user
        if (user.rows.length > 0) {
          const validPassword = await bcrypt.compare(
            credentials.password,
            // @ts-ignore
            user.rows[0].password
          );
          if (!validPassword) {
            throw new Error("Invalid password");
          }
          // return the user

          console.log(user.rows[0]);
          return user.rows[0];
        } else {
          // return null;
          throw new Error("This user does not exist");
        }
      },
    } as any),

    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.FROM_EMAIL,
    //   maxAge: 24 * 60 * 60,
    // }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      //  first time jwt callback is called, user object is available
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        // @ts-ignore
        // session.user = token.user;
        session.user.email = token.user.email;
        // @ts-ignore
        session.user.password = token.user.password;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
