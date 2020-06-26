const express = require("express")
const Router = express.Router()
const User =require("../models/User")

//importing helper functions for simplifying operations
const getUser = require("../functions/user/profile/getUser")
const setProfile = require("../functions/user/profile/setProfile")
const getProfiles = require("../functions/user/profile/getProfiles")
const acceptInvite = require("../functions/user/invites/acceptInvite")
const rejectInvite = require("../functions/user/invites/rejectInvite")
const searchProfiles = require("../functions/user/profile/searchProfiles")
const populateUserWithTeamsInfo = require("../functions/user/profile/populateUserWithTeamInfo/populateUserWithTeamInfo")
// basically /users/setprofile route
Router.post("/setprofile", setProfile)

// basically /users/getprofile route
Router.get("/getuserprofile", async (req, res) => {
    const responseData = await getUser(req.userId, "byId")

    const statusCode = responseData.status
    const payload = responseData.payload
    if(statusCode == 200){
        const userWithTeamInfo = await populateUserWithTeamsInfo(payload)
        console.log("userwithteaminfo",userWithTeamInfo)
        return res.status(statusCode).send(userWithTeamInfo)
    }
    else{
        return res.status(statusCode).send(payload)
    }
})
Router.get("/getprofiles/:pageNo", getProfiles)

Router.post("/acceptinvite", acceptInvite)


Router.post("/rejectinvite", rejectInvite)

Router.post("/searchprofiles/:pageNo", searchProfiles)

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