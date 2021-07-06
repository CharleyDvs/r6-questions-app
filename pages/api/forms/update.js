import 'database'
import { apiHandler } from 'next-api-simple-handler'
import Form from 'models/Form'
import Questions from 'models/Questions'

const updateFormSchema = {
  id: '[String] The id of the form, this is the id you get when you either create the form or update it',
  form: '[Form Object] The data of the form, just use the same format when you request it, it will be used to spread the data across each object.',
}

export const updateFormServer = async (formId, formData) => {
  try {
    const form = await Form.findOneAndUpdate(
      { _id: formId },
      {
        author: formData.author,
        formTitle: formData.formTitle,
        // answers: formData.answers,
      }
    )

    formData.questions.forEach(async (question) => {
      if (question._id) {
        await Questions.findOneAndUpdate({ _id: question._id }, question)
      } else {
        const newQuestion = await Questions.create(question)
        await form.update({
          $push: { questions: newQuestion._id },
        })
      }
    })

    return [form, null]
  } catch (error) {
    return [null, error]
  }
}

export default async function handler(req, res) {
  apiHandler(
    req,
    res,
    {
      methods: ['POST'],
      contentType: 'application/json',
      requiredBody: ['id', 'form'],
      schema: updateFormSchema,
    },
    async (req, res) => {
      const { id, form } = req.body
      const [data, error] = await updateFormServer(id, form)

      if (error) {
        console.error(error)
        return res.json({
          error: "Couldn't update form",
        })
      }

      return res.json({
        form: data,
      })
    }
  )
}
