const getUser = require("../../user/profile/getUser/getUser")
const getSquad = require("../getSquad/getSquad")
const sendSquadInvite = async (req,res)=>{
    // squad id, user email, and only admin of
    // squad should be able to send this invite

    const {
        inviteeEmail,
        squadId
    } = req.body
    
    const squadQuery = await getSquad(squadId,"byId")
    const squadStatus = squadQuery.status
    if(squadStatus===200){
        const squad = squadQuery.payload
        //check if requester is squad admin
        if(req.userId === squad.creatorId){
            //get user who is being invited
            const userQuery = await getUser(inviteeEmail,"byEmail")
            const userStatus = userQuery.status
            if(userStatus===200){
                const user = userQuery.payload
                
                //prevent sendinvite if invite already exists
                if(user.squadInvites.includes(squadId)||squad.pendingRequests.includes(user._id)){
                    return res.status(400).send({
                        message: "Invite already exists"
                    })
                }
                //prevent send invite if invitee is already member of squad
                else if(user.squads.includes(squadId)||squad.members.includes(user._Id)){
                    return res.status(400).send({
                        message : "User is already in the team"
                    })
                }
                else{
                    //now you can send the invite
                    user.squadInvites.push(squadId)
                    squad.pendingRequests.push(user._id)

                    await Promise.all([user.save(),squad.save()])
                    return res.status(200).send({
                        message: "invite sent successfully!"
                    })
                }
            }
            else{
                return res.status(userStatus).send(userQuery.payload)
            }
        }
        else{
            return res.status(400).send({
                message : "You are not the squad admin"
            })
        }
    }else{
        return res.status(squadStatus).send(squadQuery.payload)
    }
}
module.exports = sendSquadInvite