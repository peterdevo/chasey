import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import user from "../../../models/UserDetail";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        let authUser = await user.findOne({ email: credentials.email });
        if (!authUser) {
          throw new Error("This email does not exist!");
        }
        let isMatch = await authUser.comparePassword(credentials.password);

        if (isMatch) {
          return { ...authUser, name: authUser.lastName };
        } else {
          throw new Error("Incorrect password!");
        }
      },
    }),
    Providers.Google({
      clientId:
        "1009932030744-fthfnv96ajk9d540cpt1j162r7jsm2cs.apps.googleusercontent.com",
      clientSecret: "Ysh-SG2SICKDtWIKn-9AVTc5",
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/signin-page",
  },
});
