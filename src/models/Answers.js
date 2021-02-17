const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const AnswerSchema = new mongoose.Schema({
    questionId : {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    answers : [{
        text: String
    }]
})

module.exports = mongoose.model('Answer', AnswerSchema)