const express = require("express")
const router = express.Router();

const Events = require('../model/Event');


// to view all hackathons
router.get('/listHackathon',(req,res,next) => {
    Events.find()
    .exec()
    .then(docs => {
      console.log("hackathons displayed")
      res.status(200).send(docs)
    })
    .catch(err => {
      res.status(500).send({
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
    console.log("Hackathon created")
    res.status(201).send(result)
  })
  .catch(err => {
    res.status(500).send({
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
