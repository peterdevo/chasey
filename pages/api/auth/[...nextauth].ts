import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../models/UserDetail";
import { passRandom } from "../../../funtions/funtion";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        if (email === "" || password === "") {
          throw new Error("Email or password field cannot be empty!");
        }
        let authUser = await User.findOne({ email });

        if (!authUser) {
          throw new Error("This email does not exist!");
        }
        let isMatch = await authUser.comparePassword(credentials.password);

        if (isMatch) {
          return {
            ...authUser,
            id: authUser._id,
            name: `${authUser.firstName} ${authUser.lastName}`,
            email: authUser.email,
            image: authUser.image,
          };
        } else {
          throw new Error("Incorrect password!");
        }
      },
    }),
    Providers.Google({
      async profile(profile, tokens) {
        const password = passRandom();
        const currentUser = {
          id: "",
          firstName: "",
          lastName: "",
        };

        if (profile.verified_email) {
          const registeredUser = {
            email: profile.email,
            password: "12345",
            image: profile.image,
            firstName: profile.family_name,
            lastName: profile.given_name,
            phone: "-",
            address: {
              street: "",
              city: "",
              zipCode: "",
            },
            accountType: "google",
          };

          try {
            const authUser = await User.findOne({ email: profile.email });

            if (!authUser) {
              const user = new User(registeredUser);
              const response = await user.save();
              currentUser.id = response._id.toString();
              currentUser.firstName = response.firstName;
              currentUser.lastName = response.lastName;
            } else {
              currentUser.id = authUser._id.toString();
              currentUser.firstName = authUser.firstName;
              currentUser.lastName = authUser.lastName;
            }
          } catch (error) {
            console.log(error);
          }
        }

        return {
          id: currentUser.id,
          name: `${currentUser.firstName} ${currentUser.lastName}`,
        };
      },
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.userId = user.sub;
      return Promise.resolve(session);
    },
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/signin-page",
  },
});
