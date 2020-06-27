const getSquad = require("../getSquad/getSquad")
const getUser = require("../../user/profile/getUser")
const cancelSquadInvite = async (req,res)=>{
    const {
        squadId,
        inviteeId
    } = req.body

    //first check if squad exists
    const squadQuery  = await getSquad(squadId,"byId")
    const squadStatus = squadQuery.status
    if(squadStatus === 200){
        const squad = squadQuery.payload
        //then check if requester is team admin
        if(squad.creatorId === req.userId){
            
            //check if invitee exists
            const inviteeQuery = await getUser(inviteeId,"byId")
            const inviteeStatus = inviteeQuery.status
            if(inviteeStatus === 200){
                const invitee = inviteeQuery.payload
                
                //check if user has a pending invite or not
                if(invitee.squadInvites.includes(squadId)&&squad.pendingRequests.includes(inviteeId)){

                    //now you can cancel the invite
                    invitee.squadInvites = invitee.squadInvites.filter(invite=>invite!=squadId)
                    squad.pendingRequests = squad.pendingRequests.filter(request=>request!=inviteeId)
                    await Promise.all([invitee.save(),squad.save()])

                    return res.status(200).send({
                        message : "invite cancelled successfully"
                    })
                }
                else{
                    return res.status(400).send({
                        message : "No pending invite found for the user"
                    })
                }
            }
            else{
                return res.status(inviteeStatus).send(inviteeQuery.payload)
            }

        }else{
            return res.status(400).send({
                message: "You are not the squad admin"
            })
        }
    }
    else{
        return res.status(squadStatus).send(squadQuery.payload)
    }
}
module.exports = cancelSquadInvite