import 'database'
import User from 'models/User'

const verifySchema = {
  username: '[String] The name of the user you are trying to create.',
  password: '[String] The password.',
}
/**
 * verifies that the token is from a user.
 * @param  {String} token Unique identifier
 * @returns {[data, error]} An array of data ({token, username, _id}), and error object.
 */
export async function verifyToken(token) {
  const [data, error] = await User.verifyToken(token)
  return [data, error]
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).json({
      error: 'Only POST requests are allowed on this route.',
      schema: verifySchema,
    })
  }

  if (req.headers['content-type'] !== 'application/json') {
    return res.json({ error: 'Only JSON is allowed.' })
  }

  const { token } = req.body

  if (!token) {
    return res.status(400).json({
      error: 'User not verified',
    })
  }

  const [data, error] = await verifyToken(token)
  if (error) {
    return res.status(400).json({
      error: error.message,
    })
  }

  return res.status(200).json(data)
}
