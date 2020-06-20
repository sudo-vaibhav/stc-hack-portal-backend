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
    event
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


/*to update specific event(id)
Router.patch("/updateEvent/:Id", (req,res,next) => {
  return res.status(201).json({
    message: "event has been updated"
  })
})


//to remove specific event(id)
Router.delete("/removeEvent/:Id",(req,res,next) => {
  return res.status(200).json({
    message: "event has been deleted"
  })
}) */

module.exports = Router