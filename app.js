const port = process.env.PORT || 3000

const express = require("express")
const app = express()
const bodyParser = require("body-parser")

//for parsing various types of requests
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

// for allowing front end to send requests to api
const cors = require('cors')
app.use(cors())

//for accessing secret variables
require("dotenv").config()

//middleware import for authentication check
const {checkAuth} = require("./components/middleware/auth")

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
        console.log("db connected")

        //for getting and setting user profiles
        app.use("/users",checkAuth,require("./components/routes/users"))
});


//just a test route for testing auth status
app.get("/",checkAuth,(req,res)=>{
        res.status(200).send({message:"success"})
})

//route for handling signout requests
app.use("/signout",checkAuth,require("./components/routes/signout"))

app.listen(port,()=>{
        console.log(`server started on port ${port}`)
})
