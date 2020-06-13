const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")


const Teams = require('../model/Team');


router.get("/:Id",(req,res,next) => 
{
  const id = req.params.Id;
  Teams.findById(id)
  .exec() 
  .then(doc =>
    {
      if(doc){
        res.status(200).send({
          Team: doc
        })
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

router.post("/addTeam/:Id", (req,res,next) => {
  const team = new Teams({
    _id: req.body._id,
    members: [{
      type: req.body.type
    }],
    description: req.body.description,
    domain: [{
      type:req.body.type
    }],   
  })
})

router.patch("/updateTeam/:Id",(req,res,next) => {
  res.status(200).json({
    message: "Team updated"
  })
})

router.delete("/removeTeam/:Id", (req,res,next) => {
  res.status(200).json({
    message: "Team deleted"
  })
})

module.exports = router
