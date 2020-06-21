const express = require("express")
const Router = express.Router()

//importing helper functions for simplifying operations
const getUser = require("../functions/user/getUser")
const setProfile = require("../functions/user/setProfile")
const acceptInvite =require("../functions/user/acceptInvite")
const rejectInvite = require("../functions/user/rejectInvite")

// basically /users/setprofile route
Router.post("/setprofile", setProfile)

// basically /users/getprofile route
Router.get("/getuserprofile", async (req, res) => {
    const responseData = await getUser(req.userId, "byId")
    const statusCode = responseData.status
    const payload = responseData.payload
    return res.status(statusCode).send(payload)
})



Router.post("/acceptinvite", acceptInvite)

Router.post("/rejectinvite", rejectInvite)


module.exports = Router