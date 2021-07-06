import Question from 'models/Questions'
import { apiHandler } from 'next-api-simple-handler'
import 'database'

const getQuestions = async (req, res) => {
  const { id } = req.query
  try {
    const questions = await Question.findOne({ _id: id })
    res.status(200).json({ data: questions })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default async function handler(req, res) {
  await apiHandler(
    req,
    res,
    { methods: ['GET'] },
    getQuestions
  )
}
