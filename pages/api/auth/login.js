import 'database'
import { apiHandler } from 'next-api-simple-handler'
import User from 'models/User'

const loginSchema = {
  username: '[String] The name of the user you are trying to log into.',
  password: '[String] The password.',
}
/**
 * Asks for username and password and returns a [token, error] array.
 * @param  {String} username
 * @param  {String} password
 * @returns {[String, Error]} An array made of a token, and a error object.
 */
export async function loginUser(username, password) {
  const foundUser = await User.findOne({ username })

  if (!foundUser) {
    return [null, new Error(`No user found with ${username}`)]
  }

  const [identification, error] = await foundUser.login(password)
  return [identification, error]
}

export default async function handler(req, res) {
  apiHandler(
    req,
    res,
    {
      requiredBody: ['username', 'password'],
      methods: ['POST'],
      contentType: 'application/json',
      schema: loginSchema,
    },
    async (req, res) => {
      const { username, password } = req.body
      const [data, error] = await loginUser(username, password)
      if (error) {
        return res.status(400).json({
          error: error.message,
        })
      }
      return res.status(200).json({ data: data })
    }
  )
}
