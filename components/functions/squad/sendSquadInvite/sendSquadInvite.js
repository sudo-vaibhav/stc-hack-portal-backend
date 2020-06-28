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
    // Squad.findOne({
    //     _id: squadId
    // }, async (err, squad) => {
    //     if (err) {
    //         return res.status(500).send({
    //             "message": "Internal Server Error"
    //         })
    //     } else {
    //         if (squad) {
    //             //first check that requester for inviting is the squad admin
    //             if (req.userId == squad.creatorId) {

    //                 //check that squad is not full already
    //                 const eventQuery = await getEvent(squad.eventId, "byId")
    //                 const eventStatus = eventQuery.status
    //                 if (eventStatus == 200) {
    //                     const event = eventQuery.payload
    //                     if (squad.members.length >= event.maximumSquadSize) {
    //                         res.status(500).send({
    //                             message: "Squad is already full"
    //                         })
    //                     } else {
    //                         //check that invitee should exist in user database
    //                         const userQuery = await getUser(inviteeEmail, "byEmail")
    //                         const userStatus = userQuery.status

    //                         //means user was found
    //                         if (userStatus == 200) {
    //                             const invitee = userQuery.payload
    //                             //check that invitee should not be in this squad already
    //                             if (squad.members.includes(invitee._id)) {
    //                                 return res.status(400).send({
    //                                     message: "Invitee is already in your squad"
    //                                 })
    //                             }

    //                             //check that invitee does not already have a request form the same squad
    //                             if (squad.pendingRequests.includes(invitee._id)) {
    //                                 return res.status(400).send({
    //                                     message: "Invitee already has a pending request for this squad"
    //                                 })
    //                             }

    //                             //check that invitee should not be in another squad for the same event

    //                             Squad.findOne({
    //                                 eventId: squad.eventId,
    //                                 members: invitee._id
    //                             }, async (err, otherSquadofInvitee) => {
    //                                 if (err) {
    //                                     return res.status(500).send({
    //                                         message: "Internal Server Error"
    //                                     })
    //                                 } else {

    //                                     //means user is already in some other squad for the same event
    //                                     if (otherSquadofInvitee) {
    //                                         return res.status(400).send({
    //                                             message: "Invitee is already in another squad for the same Event"
    //                                         })
    //                                     } else {
    //                                         //now you have passed all checks and can invite the invitee to your squad

    //                                         //here squad represents that squad in which you originally wanted
    //                                         // to invite the user in 
    //                                         let pendingRequests = squad.pendingRequests
    //                                         pendingRequests.push(invitee._id)
    //                                         squad.pendingRequests = pendingRequests

    //                                         //also add the squad to invitee's invites array
    //                                         // so that invitee can also be informed
    //                                         invitee.invites.push(squad._id)

    //                                         try {

    //                                             //update records of both the squad and invitee
    //                                             updatedSquad = await squad.save()
    //                                             updatedInvitee = await invitee.save()
    //                                             return res.status(200).send({
    //                                                 message: "Invite sent successfully"
    //                                             })
    //                                         } catch (err) {
    //                                             return res.status(500).send({
    //                                                 message: "Internal server Error"
    //                                             })
    //                                         }
    //                                     }
    //                                 }
    //                             })
    //                         } else {
    //                             return res.status(userStatus).send(userQuery.payload)
    //                         }
    //                     }


    //                 } else {
    //                     return res.status(eventStatus).send(eventQuery.payload)
    //                 }

    //             } else {
    //                 //runs when the requester wasn't admin of the squad
    //                 return res.status(403).send({
    //                     message: "You don't possess the right access priviledges to make this request"
    //                 })
    //             }
    //         } else {
    //             return res.status(404).send({
    //                 message: "squad not found"
    //             })
    //         }
    //     }
    // })
}
module.exports = sendSquadInvite