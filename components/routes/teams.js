const express = require("express")
const Router = express.Router();
const mongoose = require("mongoose")


const Teams = require('../models/Team');


Router.get("/:Id",(req,res,next) => 
{
  const id = req.params.Id;
  Teams.findById(id)
  .exec() 
  .then(doc =>
    {
      if(doc){
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
        error: err
      })
    })
})

Router.post("/addTeam/:Id", (req,res,next) => {
  const team = new Teams({
    _id: req.body._id,
    TeamName: req.body.TeamName,
    HackathonName: req.body.HackathonName,
    HackathonLink: req.body.HackathonLink,
    description: req.body.description,
    TeamSize: req.body.TeamSize.size,
    TeamUrl: req.body.TeamUrl
  })
  const id = req.params.Id
  team.findById(id)
  .save()
  .then(result => {
    console.log("Hackathon created")
    res.status(201).send(result)
  })
  .catch(err => {
    res.status(500).send({
      error: err
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
