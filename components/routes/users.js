const express = require("express")
const Router = express.Router()

const User = require("../models/User")

//importing helper functions for simplifying operations
const getUser = require("../functions/user/getUser")
const setProfile = require("../functions/user/setProfile")

// basically /users/setprofile route
Router.post("/setprofile",setProfile)


// basically /users/getprofile route
Router.get("/getprofile", async (req,res)=>{
        console.log("/getprofile userId:",req.userId)
        
        try{
                const responseData = await getUser(req.userId,"byId")
                const statusCode = responseData.status
                const payload = responseData.payload
                return res.status(statusCode).send(payload)
        }catch(err){
                return res.status(500).send({message:"Internal Server Error"})
        }
        
})

module.exports = Router