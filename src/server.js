const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes') // includes the routes.js file

const User = require('./models/User');

const dburl = "mongodb+srv://agnik:NyPH2Iwsdz7slgDe@cluster0.se5mx.mongodb.net/<dbname>?retryWrites=true&w=majority";

app.use(express.json()) // we need to tell server to use json as well
app.use(routes) // tells the server to use the routes in routes.js

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




const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log("The api is running...")
})