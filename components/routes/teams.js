const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")

router.get("/:Id",(req,res,next) => {
  res.status(200).json({
    message: "GET request is initiated"
  })
})

router.post("/add/:Id", (req,res,next) => {
  const team = {
    name: req.body.name,
    domain: req.body.domain
  }
  res.status(201).json({
    message: "POST Request for teams",
    createdTeam: team
  })
})

router.patch("/update/:Id",(req,res,next) => {
  res.status(200).json({
    message: "Team updated"
  })
})

router.delete("/remove/:Id", (req,res,next) => {
  res.status(200).json({
    message: "Team deleted"
  })
})

module.exports = router
