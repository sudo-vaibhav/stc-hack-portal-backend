const express = require("express")
const app = express()
const bodyParser = require("body-parser")

//for parsing various types of requests
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))
//static folder for event image upload
app.use('/eventImage', express.static('./public/uploads/eventUpload'))
// for allowing front end to send requests to api
const cors = require('cors')
app.use(cors())

//for accessing secret variables
require("dotenv").config()

//middleware import for authentication check
const checkAuth= require("./components/middleware/checkAuth/checkAuth")


//importing mongoose and connecting to database
const mongoose = require("mongoose");


//for local testing use: "mongodb://127.0.0.1:27017/hackportal
mongoose.connect("mongodb://localhost/hack_apitrial5",{useNewUrlParser: true, useUnifiedTopology: true});
/*mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})*/

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("db connected")

    //for getting and setting user profiles
    app.use("/users", checkAuth, require("./components/routes/users/users"))

    //for operations related to events
    app.use('/events', require("./components/routes/events/events"));

    //for operations related to teams
    app.use('/teams', require("./components/routes/teams/teams"));

    //for operations related to squads (basically ready made teams)
    app.use("/squads", require("./components/routes/squads/squads"))

});

//route for handling signout requests
app.use("/signout", checkAuth, require("./components/routes/signout/signout"))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})