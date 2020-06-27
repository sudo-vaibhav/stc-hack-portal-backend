const express = require("express")
const Router = express.Router()
const User =require("../models/User")

//importing helper functions for simplifying operations
const setProfile = require("../functions/user/profile/setProfile")
const getProfiles = require("../functions/user/profile/getProfiles")
const acceptInvite = require("../functions/user/invites/acceptInvite")
const rejectInvite = require("../functions/user/invites/rejectInvite")
const searchProfiles = require("../functions/user/profile/searchProfiles")
const getUserProfile = require("../functions/user/profile/getUserProfile")
const leaveTeam = require("../functions/user/leaveTeam/leaveTeam")


Router.post("/setprofile", setProfile)
Router.get("/getuserprofile", getUserProfile)
Router.get("/getprofiles/:pageNo", getProfiles)
Router.post("/acceptinvite", acceptInvite)
Router.post("/rejectinvite", rejectInvite)
Router.post("/searchprofiles/:pageNo", searchProfiles)
Router.post("/leaveteam",leaveTeam)

Router.patch("/updateprofile", (req,res,next) =>
{
  delete req.body.teams,req.body.invites
  User.update({_id: req.userId}, req.body)
  .exec()
  .then(result =>
    {
    res.status(200).send({
        message: "User has been updated",
    })
  })
  .catch(err => {
    res.status(500).json({
      error: "Internal Server Error"
    })
  })
})

module.exports = Router