const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    description: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isSelected: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

module.exports = mongoose.model('Question', QuestionSchema)