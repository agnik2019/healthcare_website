var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({

  QuestionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionCategories'
  },

  userId: {
    type: String    
  },

  response : [{
      questionId: String,
      optionId: String,
  }],
  
 },);


module.exports = mongoose.model('Answer', AnswerSchema)