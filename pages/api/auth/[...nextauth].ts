import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import user from "../../../models/UserDetail";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "credentials",
      credentials: {
        email: {type: "text"},
        password: {type: "password" },
      },
      async authorize(credentials, req) {
        let authUser = await user.findOne({ email: credentials.email });
        if (!authUser) {
          throw new Error("This email does not exist!");
        }
        let isMatch = await authUser.comparePassword(credentials.password);

        if (isMatch) {
          return authUser;
        } else {
          throw new Error("Incorrect password!");
        }
      },
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  jwt: {
    signingKey: process.env.SIGNING_KEY,
  },
  pages: {
    signIn: "/signin-page",
  },
});
