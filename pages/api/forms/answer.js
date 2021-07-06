import 'database'
import { apiHandler } from 'next-api-simple-handler'
import Form from 'models/Form'

const answerExample = {
  "What's your name?": 'A dude',
  "What's your age?": '99',
}

const answerSchema = {
  id: '[String] The id of the form you are replying to',
  answer: {
    'Question 1': 'Answer 1',
  },
  HELP: `Answer is an object, the object has the keys as the name of the questions, and the values as the response.`,
  EXAMPLE: answerExample,
}

export default async function handler(req, res) {
  apiHandler(
    req,
    res,
    {
      methods: ['POST'],
      requiredBody: ['answer', 'id'],
      contentType: 'application/json',
      schema: answerSchema,
    },
    async (req, res) => {
      const { id, answer } = req.body
      const form = await Form.findById(id)
      if (!form) {
        return res.status(404).json({
          error: "Form wasn't found",
        })
      }
      const [result, error] = await form.addAnswer(answer)
      if (error) {
        return res.json({
          error: error.message,
          schema: answerSchema,
        })
      }
      return res.json({
        data: result,
      })
    }
  )
}
