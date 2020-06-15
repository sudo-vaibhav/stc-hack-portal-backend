const express = require("express")
const Router = express.Router();
const mongoose = require("mongoose")


const Teams = require('../models/Team');
const { checkAuth } = require("../middleware/auth");


Router.get("/:Id",checkAuth,(req,res,next) => 
{
  const id = req.params.Id;
  Teams.findById(id)
  .exec() 
  .then(doc =>
    {
      if(doc){
        console.log("team displayed: ",doc)
        res.status(200).send(doc)
      }
      else{
        res.status(404).send({
          message: "No Data Found!"
        })
      }
    })
  .catch(err =>
    {
      console.log(err)
      res.status(500).send({
        error: "Internal Servor Error"
      })
    })
})

Router.post("/setteam",checkAuth,(req,res,next) => {
  const team = new Teams({
    _id: new mongoose.Types.ObjectId().toString(),
    creatorId: req.userId,
    teamName: req.body.teamName,
    hackathonName: req.body.hackathonName,
    hackathonLink: req.body.hackathonLink,
    description: req.body.description,
    teamSize: req.body.teamSize,
    teamUrl: req.body.teamUrl
  })
  team
  .save()
  .then(result => {
    console.log("Team created: ",result)
    res.status(201).send(result)
  })
  .catch(err => {
    res.status(500).send({
      error: "Internal Server Error"
    })
  })
})

/*Router.patch("/updateTeam/:Id",(req,res,next) => {
  res.status(200).json({
    message: "Team updated"
  })
})

Router.delete("/removeTeam/:Id", (req,res,next) => {
  res.status(200).json({
    message: "Team deleted"
  })
})*/

module.exports = Router
