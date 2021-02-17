const express = require('express')
const Question = require('./models/Question') // includes our model
const Answers = require('./models/Answers')
const Category = require('./models/QuestionCategories')
const User = require('./models/User')
//const path = require('path');
const app= express()
//const router = express.Router
//app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser')


///app.use(bodyParser.urlencoded({extended: true}));
app.set('views', './src/views');


app.set("view engine","ejs")

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
  }));


app.get('/diagnosis', (req, res) => {
    try{
       res.render('diagnosis.ejs')
      //res.send("hi")
      //res.sendFile(path.join(__dirname+'/index.html'));

    }
    catch(err){
        console.log(err);
    }
})

app.get('/meoryou', (req, res) => {
    try{
       res.render('meoryou.ejs')
      //res.send("hi")
      //res.sendFile(path.join(__dirname+'/index.html'));

    }
    catch(err){
        console.log(err);
    }
})

app.get('/patient', (req, res) => {
    try{
       res.render('patient.ejs')
      //res.send("hi")
      //res.sendFile(path.join(__dirname+'/index.html'));

    }
    catch(err){
        console.log(err);
    }
})
app.get('/Symptoms', (req, res) => {
    try{
       res.render('Symptoms.ejs')
      //res.send("hi")
      //res.sendFile(path.join(__dirname+'/index.html'));

    }
    catch(err){
        console.log(err);
    }
})
app.get('/Regions', (req, res) => {
    try{
       res.render('Regions.ejs')
      //res.send("hi")
      //res.sendFile(path.join(__dirname+'/index.html'));

    }
    catch(err){
        console.log(err);
    }
})

// app.get('/Result', (req, res) => {
//     try{
//        res.render('Result.ejs',{response})
//       //res.send("hi")
//       //res.sendFile(path.join(__dirname+'/index.html'));

//     }
//     catch(err){
//         console.log(err);
//     }
// })

app.get('/end', (req, res) => {
    try{
       res.render('end.ejs');

    }
    catch(err){
        console.log(err);
    }
})

// get all quiz questions
app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()  //Question is a database
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

app.get('/ques', function (req, res) {   
    Question.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("Ques", { details: allDetails })
        }
})
})

app.get('/Result', function (req, res) {   
    Answers.find({"response" : { $ne : null}}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            //console.log(allDetails)
            res.render("Result", {response: allDetails })
        }
})
// var query = Answers.find({ response : { ne : null}}).select('response');

//     query.exec(function (err, someValue) {
//         if (err) return next(err);
//         res.render("Result", { response: someValue });
//     });
})

// get one quiz question
app.get('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one quiz question
app.post('/questions', async (req, res) => {
    try {
        const { description } = req.body
        const { alternatives } = req.body

        const question = await Question.create({
            description,
            alternatives
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
app.post('/Result', async(req, res) => {
    // console.log(req.body);
   try {
    const { response } = req.body
    

    const answer = await Answers.create({
        response
    })

   // return res.status(201).json(answer)
   return res.render('Result2',{response})
} catch (error) {
    return res.status(500).json({"error":error})
}
})
// update one quiz question
app.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { description, alternatives } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
app.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


app.get('/allResponse', async(req, res) => {
    try{
        var result = await Answers.find().lean();
        res.json(result);     
    }catch(e){
        res.send(e);
    }
})


module.exports = app