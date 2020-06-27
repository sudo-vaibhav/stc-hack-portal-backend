const getSquad = require("../../../squad/getSquad/getSquad")
const getUser = require("../../profile/getUser")
const { response } = require("express")
const acceptSquadInvite = async (req, res) => {
    const squadId = req.body.squadId
    const userId = req.userId

    //check if squad exists
    const squadQuery = await getSquad(squadId,"byId")
    const squadStatus = squadQuery.status

    if(squadStatus === 200){
        const squad = squadQuery.payload
        //check if user exists
        const userQuery = await getUser(userId,"byId")
        const userStatus = userQuery.status
        if(userStatus === 200){
            //check if user has an invite from squad
            const user = userQuery.payload
            if(user.squadInvites.includes(squadId)&&squad.pendingRequests.includes(userId)){
                //accept the invite and modify the relevant documents
                user.squadInvites = user.squadInvites.filter(squadInvite => squadInvite!=squadId)
                squad.pendingRequests = squad.pendingRequests.filter(pendingRequest=>pendingRequest!=userId)

                //check if user is already a member
                if(user.squads.includes(squadId)||squad.members.includes(userId)){
                    return res.status(400).send({
                        message : "User is already in the squad"
                    })
                }
                else{
                    //now modify the members and squads array
                    user.squads.push(squadId)
                    squad.members.push(userId)
                }

                // now let's save both documents
                
                await Promise.all([user.save(),squad.save()])
                return res.status(200).send({
                    message : "Squad invite accepted successfully"
                })
            }
            else{
                return res.status(400).send({
                    message: "No invite found for this team"
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
module.exports = acceptSquadInvite