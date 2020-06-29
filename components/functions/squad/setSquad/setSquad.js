const mongoose = require("mongoose")
const Squad = require("../../../models/Squad/Squad")
const getUser = require("../../user/profile/getUser/getUser")
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput")
const setSquad = async (req,res)=>{
    const userId = req.userId
    const userQuery = await getUser(userId,"byId")
    const userStatus = userQuery.status
    if(userStatus==200){
        let {squadName,description,skillsRequired} = cleanUserSuppliedInput(req.body)
        if(squadName!=""){
            //we need to initialize the model because without it,
            //mongoose won't ensure that event name is unique even 
            //after you tell it that unique:true  in Event schema 😕
            //read more about it here: https://mongoosejs.com/docs/faq.html#unique-doesnt-work
            Squad.init().then(
                ()=>{
                    const squad = new Squad({
                        squadName,description,skillsRequired,
                        creatorId : userId,
                        _id: new mongoose.Types.ObjectId().toString(),
                        members: [userId]
                    })
    
                    squad.save()
                    .then(async(result)=>{
                        const user = userQuery.payload
                        user.squads.push(result._id)
                        await user.save()
                        return res.status(200).send(result)
                    })
                    .catch(err=>{
                        return res.status(400).send({
                            message: "Duplicate squad name, choose another name."
                        })
                    })
                }
            )

        }
        else{
            return res.status(400).send({
                message :"Name can't be empty string"
            })
        }



    }
    else{
        return res.status(userStatus).send(userQuery.payload)
    }
}
module.exports = setSquad