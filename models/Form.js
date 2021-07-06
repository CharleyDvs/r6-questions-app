import mongoose from 'mongoose'
import Questions from 'models/Questions'
import types from 'constants/options'
import Answers from 'models/Answers'

const formSchema = new mongoose.Schema({
  author: mongoose.Types.ObjectId,
  formTitle: {
    type: 'string',
    required: false,
  },
  questions: [{ type: mongoose.Types.ObjectId, ref: 'Question' }],
  answers: {
    type: [{}],
    default: [],
  },
})

formSchema.methods.addAnswer = async function (answer) {
  try {
    this.answers.push(answer)
    const result = await this.save()
    return [result, null]
  } catch (error) {
    return [null, new Error(`Couldn't add answer to the form ${this._id}`)]
  }
}

formSchema.methods.clientsAnswers = async function () {
  const answer = await Answers.find({ form: this._id }).exec()
  return answer
}

formSchema.methods.addMultipleQuestion = async function (text, options) {
  const newQuestion = await Questions.create({
    text,
    options,
    type: types.MULTIPLE,
  })
  this.questions.push(newQuestion._id)
  return newQuestion
}

formSchema.methods.addRangeQuestion = async function (
  text,
  minRange,
  maxRange
) {
  const newQuestion = await Questions.create({
    text,
    minRange,
    maxRange,
    type: types.RANGE,
  })
  this.questions.push(newQuestion._id)
  return newQuestion
}

formSchema.methods.addOpenQuestion = async function (text) {
  const newQuestion = await Questions.create({ text, type: types.OPEN })
  this.questions.push(newQuestion._id)
  return newQuestion
}

formSchema.methods.addCheckboxQuestion = async function (text, options) {
  const newQuestion = await Questions.create({
    text,
    options,
    type: types.CHECKBOX,
  })
  this.questions.push(newQuestion._id)
  return newQuestion
}

formSchema.methods.addBooleanQuestion = async function (text) {
  const newQuestion = await Questions.create({
    text,
    options: ['YES', 'NO'],
    type: types.BOOLEAN,
  })
  this.questions.push(newQuestion._id)
  return newQuestion
}

const Form = mongoose.models.Form || mongoose.model('Form', formSchema)

export default Form
