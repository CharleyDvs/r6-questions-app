import 'database'
import User from 'models/User'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const user = await User.findOne({
          email: credentials.email,
        })

        if (!user) {
          throw new Error('No user found!')
        }

        const isValid = await user.isPasswordCorrect(credentials.password)

        if (!isValid) {
          throw new Error('Could not log you in!')
        }

        return { name: user.username }
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      const referredUser = await User.findOne({ username: user.name })
      session.user.id = referredUser._id

      return session
    },
  },
})
