import 'database'
import Form from 'models/Form'

const deleteSchema = {
    id: '[String] The id of the form to delete'
}

export default async function handler(req, res) {
    const { method } = req
    if (method != 'POST') {
        return res.status(400).json({
            error: "Only POST is accepted to this route",
            schema: deleteSchema
        })
    }

    if (req.headers['content-type'] != 'application/json'){
        return res.json({ error: 'Only JSON data is accepted' })
    }
    try{
        const _id = req.body.id
        const data = await Form.remove({_id});
        return res.status(200).json(data)
    } catch (error){
        return res.status(400).json({
            error: error.message
        })
    }
        


}