const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const models = require("./components/models/models");
//for accessing secret variables
require("dotenv").config();

// for allowing front end to send requests to api
const cors = require("cors");
app.use(cors());

//middleware import for authentication check
const checkAuth = require("./components/middleware/checkAuth/checkAuth");

//for parsing various types of requests
app.use(bodyParser.json({ limit: "6mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "6mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//importing mongoose and connecting to database
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//for local testing use: "mongodb://127.0.0.1:27017/hackportal
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("db connected");

  // setting up indices on all models
  await Promise.all(models.map((model) => model.init()));
  //for getting and setting user profiles
  app.use("/users", checkAuth, require("./components/routes/users/users"));

  //for operations related to events
  app.use("/events", require("./components/routes/events/events"));

  //for operations related to teams
  app.use("/teams", require("./components/routes/teams/teams"));

  //for operations related to squads (basically ready made teams)
  app.use("/squads", require("./components/routes/squads/squads"));

  app.use((err, req, res, next) => {
    console.log(err.message);
    return res.status(400).send({
      message: err.message,
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
