var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({

  quesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionCategories'
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  response : [{
      // questionId: String,
      // optionId: String,
      type: String
  }]
  
 });


module.exports = mongoose.model('Answers', AnswerSchema)