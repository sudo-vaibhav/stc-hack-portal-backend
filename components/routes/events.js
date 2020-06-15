const express = require("express")
const Router = express.Router();
const mongoose = require("mongoose")

const Event = require('../models/Event');
const { checkAuth } = require("../middleware/auth");



// to view all hackathons
Router.get('/gethackathon',(req,res,next) => {
    Event.find()
    .exec()
    .then(docs => {
      console.log("hackathons displayed",docs)
      res.status(200).send(docs)
    })
    .catch(err => {
      res.status(500).send({
        error: err
      })
    })
})


//to view specific hackathon(id)
Router.get("/abouthackathon/:Id",(req,res,next) => {
  const id = req.params.Id
  Event.findById(id)
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
    .catch(err => {
      res.status(500).send({
        error: err
      })
    })
})


//to add info about specific hackathon(id) 
Router.post("/sethackathon",checkAuth,(req,res,next) => 
{
  const event = new Event({
    _id: new mongoose.Types.ObjectId().toString(),
    creatorId: req.userId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    nameOfEvent: req.body.nameOfEvent,
    description: req.body.description,
    eventUrl: req.body.eventUrl
  });
  event
  .save()
  .then(result => {
    console.log("Hackathon created",result)
    res.status(201).send(result)
  })
  .catch(err => {
    res.status(500).send({
      error: err
    })
  })
})


/*to update specific hackathon(id)
Router.patch("/updateHackathon/:Id", (req,res,next) => {
  res.status(201).json({
    message: "hackathon has been updated"
  })
})


//to remove specific hackathon(id)
Router.delete("/removeHackathon/:Id",(req,res,next) => {
  res.status(200).json({
    message: "hackathon has been deleted"
  })
}) */

module.exports = Router
