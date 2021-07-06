import 'database'
import { apiHandler } from 'next-api-simple-handler'
import User from 'models/User'

const registerSchema = {
  username: '[String] The name of the user you are trying to create.',
  password: '[String] The password.',
}

export async function registerUser(username, password) {
  const [identification, error] = await User.createUser(username, password)
  return [identification, error]
}

export default async function handler(req, res) {
  apiHandler(
    req,
    res,
    {
      methods: ['POST'],
      contentType: 'application/json',
      requiredBody: ['username', 'password'],
      schema: registerSchema,
    },
    async (req, res) => {
      const { username, password } = req.body
      // Password verification.
      if (password.trim().length === 0) {
        return res.status(400).json({
          error: 'Incorrect password format',
          schema: registerSchema,
        })
      }

      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password too short',
        })
      }

      const [token, error] = await registerUser(username, password)

      if (error) {
        return res.status(400).json({
          error: error.message,
          schema: registerSchema,
        })
      }

      return res.status(200).json(token)
    }
  )
}
