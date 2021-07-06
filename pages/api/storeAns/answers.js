import Answers from 'models/Answers'
import 'database'
import mongoose from 'mongoose'

const answersFormat = {
    name: String,
    form:  { type: mongoose.Types.ObjectId, ref: 'Form' },
    answers: [String]
}

export default async function handler(req, res) {
    const { method } = req
    if (method != 'POST') {
        return res.status(400).json({
            error: "Only POST is accepted to this route",
            schema: answersFormat
        })
    }

    if (req.headers['content-type'] != 'application/json'){
        return res.json({ error: 'Only JSON data is accepted' })
    }
    try{
        const data = await Answers.create(req.body);
        return res.status(201).json(data)
    } catch (error){
        return res.status(400).json({
            error: error.message
        })
    }
        


}
