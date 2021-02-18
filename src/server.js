
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}


const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes') // includes the routes.js file
const cors = require('cors') // includes cors module

const User = require('./models/User');
var passport = require('passport');
var authenticate = require('./authenticate');
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

//const dburl = 'mongodb//localhost:27017/myquizapp';
//const dburl = process.env.DBURL;
//console.log(dburl)
const dburl = "mongodb+srv://agnik:NyPH2Iwsdz7slgDe@cluster0.se5mx.mongodb.net/<dbname>?retryWrites=true&w=majority";

app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use(routes) // tells the server to use the routes in routes.js
//mongodb://localhost:27017/myquizapp
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//let port = process.env.PORT || 9000;



function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
          next();
    }
}


const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log("The api is running...")
})