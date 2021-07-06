import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  minRange: {
    type: Number,
    required: false,
  },
  maxRange: {
    type: Number,
    required: false,
  },
  options: {
    type: [String],
    required: false,
  },
})

const Question =
  mongoose.models.Question || mongoose.model('Question', questionSchema)

export default Question
