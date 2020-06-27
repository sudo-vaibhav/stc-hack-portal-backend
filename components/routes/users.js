const express = require("express")
const Router = express.Router()
const User =require("../models/User")

//importing helper functions for simplifying operations
const setProfile = require("../functions/user/profile/setProfile")
const getProfiles = require("../functions/user/profile/getProfiles")
const acceptTeamInvite = require("../functions/user/invites/teamInvites/acceptTeamInvite")
const rejectTeamInvite = require("../functions/user/invites/teamInvites/rejectTeamInvite")
const leaveTeam = require("../functions/user/leaveTeam/leaveTeam")
const leaveSquad = require("../functions/user/leaveSquad/leaveSquad")
const acceptSquadInvite = require("../functions/user/invites/squadInvites/acceptSquadInvite")
const rejectSquadInvite = require("../functions/user/invites/squadInvites/rejectSquadInvite")

const searchProfiles = require("../functions/user/profile/searchProfiles")
const getUserProfile = require("../functions/user/profile/getUserProfile")

Router.post("/setprofile", setProfile)
Router.get("/getuserprofile", getUserProfile)
Router.get("/getprofiles/:pageNo", getProfiles)
Router.post("/acceptteaminvite", acceptTeamInvite)
Router.post("/rejectteaminvite", rejectTeamInvite)
Router.post("/acceptsquadinvite", acceptSquadInvite)
Router.post("/rejectsquadinvite",rejectSquadInvite)
Router.post("/searchprofiles/:pageNo", searchProfiles)
Router.post("/leaveteam",leaveTeam)
Router.post("/leavesquad",leaveSquad)

Router.patch("/updateprofile", (req,res,next) =>
{
  delete req.body["teams"]
  delete req.body["invites"]
  delete req.body["squads"]
  delete req.body["squadInvites"]
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