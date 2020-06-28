const getUser = require("../../user/profile/getUser/getUser")
const getSquad = require("../getSquad/getSquad")
const removeSquadMember = async (req,res)=>{
    const adminId = req.userId
    const squadId = req.body.squadId
    const memberId = req.body.memberId

    //first check if squad exists
    const squadQuery = await getSquad(squadId,"byId")
    const squadStatus = squadQuery.status
    if(squadStatus===200){
        //check if requester is admin
        const squad = squadQuery.payload
        if(squad.creatorId===adminId){
            //check if member exists and is not admin of the squad
            const memberQuery = await getUser(memberId,"byId")
            const memberStatus = memberQuery.status
            if(memberStatus===200){
                const member = memberQuery.payload
                if(squad.members.includes(memberId) && member.squads.includes(squadId)){
                    if(memberId != adminId){
                        //then remove member
                        squad.members = squad.members.filter(squadMember=>squadMember!=memberId)
                        member.squads = member.squads.filter(squadInstance => squadInstance!=squadId)

                        await Promise.all([squad.save(),member.save()])
                        return res.status(200).send({
                            message : "squad member removed successfully"
                        })
                    }
                    else{
                        return res.status(400).send({
                            message: "Admin can't remove himself/herself. Try deleting squad instead"
                        })
                    }
                }
                else{
                    return res.status(400).send({
                        message: "User is not member of the squad"
                    })
                }
            }
            else{
                return res.status(memberStatus).send(memberQuery.payload)
            }
        }
        else{
            return res.status(400).send({
                message : "You are not the admin of this squad"
            })
        }
    }
    else{
        return res.status(squadStatus).send(squadQuery.payload)
    }
}
module.exports = removeSquadMember