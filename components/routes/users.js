const express = require("express")
const Router = express.Router()

const User = require("../models/User")


// basically /users/setprofile route
Router.post("/setprofile",(req,res)=>{
        console.log("received set profile request for ", req.userId)
        console.log("userId is: ",req.userId)

        // extracting all the data provided about user in request body
        const {bio,name,skills,college,expectedGraduation,githubLink,stackOverflowLink,externalLink} = req.body
        
        //constructing user json object from the data for use in mongoDB document
        const userData = {
                _id: req.userId,
                name: name,
                email: req.email,
                college: college,
                expectedGraduation: expectedGraduation || "",
                bio: bio,
                skills: skills || [],
                githubLink: githubLink || "",
                stackOverflowLink: stackOverflowLink || "",
                externalLink: externalLink || ""
        }

        
        User.findOne({_id: req.userId },async (err, user)=>{
                if(err){
                        console.log("Error in finding user",err)
                        res.status(500).send({
                                "message": "internal server error"
                        })
                }
                else{
                        if(user){
                                console.log("user found")
                                console.log(user)
                                user.overwrite(userData)
                                const updatedUser = await user.save()
                                console.log("user updated :" , updatedUser)
                                res.status(200).send(updatedUser)
                        }
                        else{
                                console.log("user not found, creating a new document")
                                let user = new User(userData)
                                const newUser = await user.save()
                                console.log("user saved :" , newUser)
                                res.status(200).send(newUser)
                        }
                }
        })
       
})


// basically /users/getprofile route
Router.get("/getprofile",(req,res)=>{
        User.findOne({_id: req.userId },async (err, user)=>{
                if(err){
                        console.log("Error in finding user",err)
                        res.status(500).send({
                                message: "Internal server error"
                        })
                }else{
                        if(user){
                                res.status(200).send(user)
                        }
                        else{
                                res.status(404).send({
                                        message: "User not found"
                                })
                        }
                }
        })
})

module.exports = Router