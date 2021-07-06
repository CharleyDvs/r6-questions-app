import 'database'
import { apiHandler } from 'next-api-simple-handler'
import Form from 'models/Form'

const createFormSchema = {
  HELP: 'When you use this route in a "GET" request you\'ll get the ID of the new form',
  RETURNS: {
    questions:
      '[Array of Question Object] The array of the questions. It will always be empty.',
    answers:
      '[Array of Strings] The array of answers. It will always be empty.',
    _id: "[String] The id of the form you just created, keep this safe, you'll need it to create forms",
  },
}

export default async function handler(req, res) {
  apiHandler(
    req,
    res,
    {
      methods: ['GET'],
      schema: createFormSchema,
    },
    async () => {
      try {
        const newForm = await Form.create({})
        return res.status(200).json(newForm)
      } catch (err) {
        console.error(err)
        return res.status(400).json({ error: err.message })
      }
    }
  )
}
