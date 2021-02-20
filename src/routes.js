const express = require('express')
const Question = require('./models/Question') // includes our model
const Answers = require('./models/Answers')
const Category = require('./models/QuestionCategories')
const User = require('./models/User')
const passport = require('passport');


const catchAsync = require('./utils/catchAsync');
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


  app.get('/diagnosis1', (req, res) => {
    try{
       res.render('diagnosis1.ejs')
    }
    catch(err){
        console.log(err);
    }
})


app.get('/register', (req, res) => {
    try{
        res.render('register.ejs')
 
     }
     catch(err){
         console.log(err);
     }
});


app.get('/login', (req, res) => {
    try{
    res.render('login');
    }
    catch(err){
        console.log(err)
    }
})
app.get('/error', (req, res) => {
    try{
    res.render('error');
    }
    catch(err){
        console.log(err)
    }
})

app.get('/errorreg', (req, res) => {
    try{
    res.render('errorreg');
    }
    catch(err){
        console.log(err)
    }
})


app.post('/register', (req, res, next) => {
    User.register(new User({username: req.body.username, email: req.body.email}), 
      req.body.password, (err, user) => {
      if(err) {
        // res.statusCode = 500;
        // res.setHeader('Content-Type', 'application/json');
        // res.json({err: err});
        res.redirect('errorreg')
      }
      else {
        passport.authenticate('local')(req, res, () => {
        //   res.statusCode = 200;
        //   res.setHeader('Content-Type', 'application/json');
        //   res.json({success: true, status: 'Registration Successful!'});
          res.redirect('diagnosis')
        });
      }
    });
  });
  
  app.post('/login', passport.authenticate('local',{ failureRedirect: '/error' }), (req, res) => {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json({success: true, status: 'You are successfully logged in!'});
    res.redirect('diagnosis')
  });



app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('diagnosis1');
})


app.get('/diagnosis', (req, res) => {
    try{
       res.render('diagnosis.ejs')
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






// get all  questions
app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()  //Question is a database
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

app.get('/ques', async  (req, res)  => {   
    await Question.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("ques", { details: allDetails })
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

// get one  question
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

// create one  question
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
// update one  question
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

// delete one  question
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