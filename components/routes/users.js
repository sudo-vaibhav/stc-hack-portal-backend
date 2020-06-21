const express = require("express")
const Router = express.Router()

//importing helper functions for simplifying operations
const getUser = require("../functions/user/profile/getUser")
const setProfile = require("../functions/user/profile/setProfile")
const getProfiles = require("../functions/user/profile/getProfiles")
const acceptInvite = require("../functions/user/invites/acceptInvite")
const rejectInvite = require("../functions/user/invites/rejectInvite")
const searchProfiles = require("../functions/user/profile/searchProfiles")

// basically /users/setprofile route
Router.post("/setprofile", setProfile)

// basically /users/getprofile route
Router.get("/getuserprofile", async (req, res) => {
    const responseData = await getUser(req.userId, "byId")
    const statusCode = responseData.status
    const payload = responseData.payload
    return res.status(statusCode).send(payload)
})
Router.get("/getprofiles/:pageNo", getProfiles)

Router.post("/acceptinvite", acceptInvite)

Router.post("/rejectinvite", rejectInvite)

Router.get("/searchprofiles/:pageNo", searchProfiles)

module.exports = Router