const express = require("express")
const Router = express.Router();
const mongoose = require("mongoose")

const Event = require('../models/Event');
const {
    checkAuth
} = require("../middleware/auth");



// to view all events
Router.get('/getevents', (req, res, next) => {
    Event.find()
         .select('-__v')
        .exec()
        .then(docs => {
            console.log("events displayed", docs)
            return res.status(200).send(docs)
        })
        .catch(err => {
            return res.status(500).send({
                error: err
            })
        })
})


//to view specific event(id)
Router.get("/aboutevent/:Id", (req, res, next) => {
    const id = req.params.Id
    Event.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            if (doc) {
                return res.status(200).send(doc)
            } else {
                return res.status(404).send({
                    message: "No Data Found!"
                })
            }
        })
        .catch(err => {
            return res.status(500).send({
                error: "Internal Servor Error"
            })
        })
})


//to add info about specific event(id) 
Router.post("/setevent", checkAuth, (req, res, next) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId().toString(),
        creatorId: req.userId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
        nameOfEvent: req.body.nameOfEvent,
        description: req.body.description,
        eventUrl: req.body.eventUrl,
        minimumTeamSize: req.body.minimumTeamSize,
        maximumTeamSize: req.body.maximumTeamSize
    });
    event.select('-__v')
        .save()
        .then(result => {
            console.log("Event created", result)
            return res.status(201).send(result)
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })
})


Router.patch("/updateevent/:Id", checkAuth, (req,res,next) =>
{
  const id = req.params.Id
  delete req.body._id,req.body.creatorId
  Event.update({_id: id}, req.body)
  .exec()
  .then(result =>
    {
    res.status(200).send({
        message: "Event has been updated",
    })
  })
  .catch(err => {
    res.status(500).json({
      error: "Internal Server Error"
    })
  })
})



/*to remove specific event(id)
Router.delete("/removeEvent/:Id",(req,res,next) => {
  return res.status(200).json({
    message: "event has been deleted"
  })
}) */

module.exports = Router