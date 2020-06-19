const express = require("express")
const Router = express.Router()

//importing helper functions for simplifying operations
const getUser = require("../functions/user/getUser")
const setProfile = require("../functions/user/setProfile")

// basically /users/setprofile route
Router.post("/setprofile",setProfile)

// basically /users/getprofile route
Router.get("/getprofile", async (req,res)=>{
        const responseData = await getUser(req.userId,"byId")
        const statusCode = responseData.status
        const payload = responseData.payload
        return res.status(statusCode).send(payload)
})

module.exports = Router