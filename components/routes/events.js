const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")


// to view all hackathons
router.get('/list',(req,res,next) => {
  res.status(200).json({
    message: "You can see all hackathons"
  })
})

//to view specific hackathon(id)
router.get("/about/:Id",(req,res,next) => {
  res.status(200).json({
    message: "You can see specific hackathon details"
  })
})

//to add info about specific hackathon(id)
router.post("/add/:Id",(req,res,next) => {
  const event = {
      nameofevent:  req.body.nameofevent,
      date:  new Date().toUTCString()
  }
  res.status(201).json({
    message: "POST Request is handled",
    createdHackathon: event
  })

})

//to update specific hackathon(id)
router.patch("/update/:Id", (req,res,next) => {
  res.status(201).json({
    message: "hackathon has been updated"
  })
})

//to remove specific hackathon(id)
router.delete("/remove/:Id",(req,res,next) => {
  res.status(200).json({
    message: "hackathon has been deleted"
  })
})

module.exports = router
