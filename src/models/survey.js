/*
*
* SURVEY QUESTIONS
*
*/

const QUESTION_TYPE_ENUMS = {
    TEXT: 'TEXT',
    TEXT_AREA: 'TEXT_AREA',
    NUMBER: 'NUMBER',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    SINGLE_CHOICE: 'SINGLE_CHOICE',
    RATING: 'RATING',
    YES_NO: 'YES_NO',
  };
  
  const QUESTION_OPTION_SCHEMA = new Mongo.Schema({
    label: String,
  });
  
  const schema = new Mongo.Schema(
    {
      label: String,
      description: String,
      customerId: {
        type: String,
        required: true,
      },
      options: [QUESTION_OPTION_SCHMA], // will only exist for MULTIPLE_CHOICE, SINGLE_CHOICE, YES_NO
      questionType: {
        type: String,
        enum: Object.keys(QUESTION_TYPE_ENUMS).map(
          (key) => QUESTION_TYPE_ENUMS[key]
        ),
      },
    }
  );
  
  const SurveyQuestions = Mongo.model('SurveyQuestions', schema);
  
  /*
  *
  * SURVEY TEMPLATES
  *
  */
  
  
  
  const schema = new Mongo.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      questionIds: {
        type: [String], // a list of SurveyQuestion _ids
        required: true,
      },
    }
  );
  
  const SurveyTemplates = Mongo.model('SurveyTemplates', schema);
  
  
  
  
  
  /*
  *
  * SURVEY RESPONSES
  *
  */
  
  const RESPONSE_SCHEMA = new Mongo.Schema({
    surveyQuestionId: String,
    label: String, // the question label/text
    answer: String, // how to handle multiple choice answers? Just stringify the array? e.g. "['a', 'c', 'd']"
  });
  
  const schema = new Mongo.Schema(
    {
      surveyTemplateId: {
        type: String,
        required: true,
      },
      responses: [RESPONSE_SCHEMA],
    }
  );
  
  const SurveyResponses = Mongo.model('SurveyResponses', schema);