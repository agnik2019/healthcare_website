var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({


  name: String, //back pain etc

  questions : [{
    questionText: String,
    options: [{
      optionText : String
    }],
  }]
  
 });

 QuestionCategories= mongoose.model('QuestionCategories', CategorySchema );

module.exports = QuestionCategories; 