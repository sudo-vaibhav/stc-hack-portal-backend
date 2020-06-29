const getSquad = require("../../../../squad/getSquad/getSquad")
const getUser = require("../../../profile/getUser/getUser")
const rejectSquadInvite = async (req,res)=>{
    const inviteeId = req.userId
    const squadId = req.params.squadId

    //first check if squad exists
    const squadQuery = await getSquad(squadId,"byId")
    const squadStatus = squadQuery.status
    if(squadStatus === 200){
        const squad = squadQuery.payload
        //second check if user exists
        const userQuery = await getUser(inviteeId,"byId")
        const userStatus = userQuery.status
        if(userStatus === 200){
            const user = userQuery.payload
            //check if they have invite
            if(user.squadInvites.includes(squadId) || squad.pendingRequests.includes(inviteeId)){
                //reject the invite
                user.squadInvites = user.squadInvites.filter(squadInvite=>squadInvite!=squadId)
                squad.pendingRequests = squad.pendingRequests.filter(pendingRequest=>pendingRequest!=inviteeId)

                await Promise.all([user.save(),squad.save()])

                return res.status(200).send({
                    message : "Rejected invite for squad successfully"
                })

            }
            else{
                return res.status(400).send({
                    message : "invite for the squad not found"
                })
            }

        }
        else{
            return res.status(userStatus).send(userQuery.payload)
        }

    }
    else{
        return res.status(squadStatus).send(squadQuery.payload)
    }
}
module.exports =rejectSquadInvite