const express = require('express')
const User = require('./models/User')
const Question = require('./models/Question') // includes our model
const Answers = require('./models/Answers')
const session = require("express-session");

const app= express()

app.set('views', './src/views');


app.set("view engine","ejs")

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended: true
  }));

app.use(session({secret:"notagoodsecret", resave:true, saveUninitialized:true}));

const requireLogin = (req,res,next) => {
    if(!req.session.user_id){
        return res.redirect('/login')
    }
    next();
 }
 


  app.get('/', (req, res) => {
    try{
       res.render('diagnosis1.ejs')
    }
    catch(err){
        console.log(err);
    }
})
app.get('/patient_dashboard', requireLogin,(req, res) => {
    try{
       res.render('patientDash.ejs')
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
app.post('/register', async( req, res) => {
    try{
    const {password, username, email} = req.body;
    const user = new User({username, password, email});
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/patient_dashboard');
    }
    catch {
        res.redirect("/error")
    }
});

app.get('/login', (req,res) => {
    res.render('login')
 });

 app.get('/error', (req, res) => {
    try{
    res.render('error');
    }
    catch(err){
        console.log(err)
    }
});

 app.post('/login', async(req,res) => {
     try{
    const {username, password} = req.body;
    const foundUser = await User.findAndValidate(username, password)
    if(foundUser){
        req.session.user_id = foundUser._id;
        res.redirect('/patient_dashboard');
    } else {
        res.redirect("/error")
    }} catch{
        res.redirect("/error")
    }
 });

 app.post('/logout',(req,res) => {
    req.session.user_id = null;
    res.redirect('/login')
 });

 app.get('/diagnosis', requireLogin,(req, res) => {
    try{
       res.render('diagnosis.ejs')
    }
    catch(err){
        console.log(err);
    }
});
app.get('/meoryou',requireLogin, (req, res) => {
    try{
       res.render('meoryou.ejs')

    }
    catch(err){
        console.log(err);
    }
})
app.get('/patient',requireLogin, (req, res) => {
    try{
       res.render('patient.ejs')
    }
    catch(err){
        console.log(err);
    }
})
app.get('/Symptoms',requireLogin, (req, res) => {
    try{
       res.render('Symptoms.ejs');
    }
    catch(err){
        console.log(err);
    }
});

app.get('/ques',requireLogin, async  (req, res)  => {   
    await Question.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("ques", { details: allDetails })
        }
})
});

app.get('/Result',requireLogin,function (req, res)
 {   
    Answers.find({"response" : { $ne : null}}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            //console.log(allDetails)
            res.render("Result", {response: allDetails })
        }
})
 });

 app.post('/Result', async(req, res) => {
    // console.log(req.body);
   try {
    const { response } = req.body;
    const answer = await Answers.create({
        response
    })
   return res.render('Result2',{response})
} catch (error) {
    return res.status(500).json({"error":error})
}
})




module.exports = app