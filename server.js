"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/user")
const sbtRouter = require("./routes/sbt")


app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 
// node server.js

app.use("/api/v1/user", userRouter)
app.use("/api/v1/sbt", sbtRouter)

const handleListen = () => {
    // TODO: Update fetching PORT
    console.log(`Listening on ${process.env.PORT}`)
}

app.listen(process.env.PORT, handleListen)
