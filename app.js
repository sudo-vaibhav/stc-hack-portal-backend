const port = process.env.PORT || 3000

const express = require("express")
const app = express()
const bodyParser = require("body-parser")

//for parsing various types of requests
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))

// for allowing front end to send requests to api
const cors = require('cors')
app.use(cors())

//for accessing secret variables
require("dotenv").config()

//middleware import for authentication check
const {
    checkAuth
} = require("./components/middleware/auth")


//importing mongoose and connecting to database
const mongoose = require("mongoose");


//for local testing use: "mongodb://127.0.0.1:27017/hackportal"
mongoose.connect("mongodb://localhost/hack_apitrial5",{useNewUrlParser: true, useUnifiedTopology: true});
/*mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})*/

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("db connected")

    //for getting and setting user profiles
    app.use("/users", checkAuth, require("./components/routes/users"))

    //for operations related to events
    app.use('/events', require("./components/routes/events"));

    //for operations related to teams
    app.use('/teams', require("./components/routes/teams"));

});

//just a test route for testing auth status
app.get("/", checkAuth, (req, res) => {
    return res.status(200).send({
        message: "success"
    })
})

//route for handling signout requests
app.use("/signout", checkAuth, require("./components/routes/signout"))



app.listen(port, () => {
    console.log(`server started on port ${port}`)
})