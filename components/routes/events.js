const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");

const Events = require('../model/Event');


// to view all hackathons
router.get('/listHackathon',(req,res,next) => {
    Events.find()
    .exec()
    .then(docs => {
      const response ={
        details: docs.map(doc => {
          return {
            _id: doc._id,
            startDate: doc.startDate,
            endDate: doc.endDate,
            location: doc.location,
            NameOfEvent: doc.NameOfEvent,
            description: doc.description,
            EventUrl: doc.EventUrl
          }
        })
      }
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})


//to view specific hackathon(id)
router.get("/aboutHackathon/:Id",(req,res,next) => {
  const id = req.params.id
  Events.findById(id)
  .exec()
  .then(doc => 
    {
      if(doc){
        res.status(200).json({
          details: doc
        })
      }
      else{
        res.status(404).json({
          message: "No Data Found!"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})


//to add info about specific hackathon(id)
router.post("/addHackathon/:Id",(req,res,next) => 
{
  const event = new Events({
    _id: req.body._id,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    NameOfEvent: req.body.NameOfEvent,
    description: req.body.description,
    EventUrl: req.body.EventUrl
  });
  const id = req.params.Id
  event.findById(id)
  .save()
  .then(result => {
    res.status(201).json({
      addedHackathon: {
        _id: result._id,
      startDate: result.startDate,
      endDate: result.endDate,
      location: result.location,
      NameOfEvent: result.NameOfEvent,
      description: result.description,
      EventUrl: result.EventUrl
      }
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
})


/*to update specific hackathon(id)
router.patch("/updateHackathon/:Id", (req,res,next) => {
  res.status(201).json({
    message: "hackathon has been updated"
  })
})


//to remove specific hackathon(id)
router.delete("/removeHackathon/:Id",(req,res,next) => {
  res.status(200).json({
    message: "hackathon has been deleted"
  })
}) */

module.exports = router
