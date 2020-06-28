const getUser = require("../../user/profile/getUser/getUser")
const getSquad = require("../../squad/getSquad/getSquad")

const leaveSquad = async (req,res)=>{
    const squadId = req.body.squadId
    const userId = req.userId

    //check if squad exists
    const squadQuery = await getSquad(squadId,"byId")
    const squadStatus = squadQuery.status
    if(squadStatus===200){

        const squad = squadQuery.payload
        //check if user is in squad
        const userQuery = await getUser(userId,"byId")
        const userStatus = userQuery.status
        if(userStatus===200){
            const user = userQuery.payload
            if(user.squads.includes(squadId)&& squad.members.includes(userId)){
                //check if user is not the admin
                if(squad.creatorId != userId){
                    //then remove the user

                    squad.members = squad.members.filter(memberObject => memberObject!=userId)
                    user.squads = user.squads.filter(squadObject => squadObject!=squadId)

                    await Promise.all([squad.save(),user.save()])

                    return res.status(200).send({
                        message : "Left the squad successfully"
                    })
                }
                else{
                    return res.status(400).send({
                        message : "Admin can't leave the squad, try deleting the squad instead."
                    })
                }
            }
            else{
                return res.status(400).send({
                    message : "user is not in this squad"
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
module.exports = leaveSquad