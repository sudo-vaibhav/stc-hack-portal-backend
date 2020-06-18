const express = require("express")
const Router = express.Router();
const mongoose = require("mongoose")


const Teams = require('../models/Team');

//helper functions for simplifying code
const sendInvite = require("../functions/team/sendInvite")
//authentication middleware
const {
  checkAuth
} = require("../middleware/auth");


Router.get("/:Id", checkAuth, (req, res, next) => {
  const id = req.params.Id;
  Teams.findById(id)
  .exec()
  .then(doc => {
    if (doc) {
      return res.status(200).send(doc)
    } else {
      return res.status(404).send({
        message: "Team not found"
      })
    }
  })
  .catch(err => {
    return res.status(500).send({
      message: "Internal Servor Error"
    })
  })
})

Router.post("/setteam", checkAuth, (req, res) => {
  const team = new Teams({
    _id: new mongoose.Types.ObjectId().toString(),
    creatorId: req.userId,
    teamName: req.body.teamName,
    hackathonId: req.body.hackathonId,
    description: req.body.description,
    teamUrl: req.body.teamUrl || "",
    members: [req.userId]
  })
  team
  .save()
  .then(result => {
    return res.status(201).send(result)
  })
  .catch(err => {
    return res.status(500).send({
      error: "Internal Server Error"
    })
  })
})

Router.post("/sendinvite", checkAuth, sendInvite)

/*Router.patch("/updateTeam/:Id",(req,res,next) => {
  return res.status(200).json({
    message: "Team updated"
  })
})

Router.delete("/removeTeam/:Id", (req,res,next) => {
  return res.status(200).json({
    message: "Team deleted"
  })
})*/

module.exports = Router