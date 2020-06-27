const getTeam = require("../getTeam/getTeam")
const deleteTeam = async (req,res)=>{
    //first find the team
    const userId = req.userId
    const teamId = req.params.teamId
    const teamQuery = await getTeam(teamId,"byId")

    const teamStatus = teamQuery.status
    if(teamStatus===200){
        const team = teamQuery.payload
        //then check if requester is admin of that team
        if(team.creatorId === userId){
            //then delete that team
            await team.remove()  // removing all mentions of that team
                                // in users database will happen using post
                                // middleware in team schema 😃
            return res.status(200).send({
                message: "Team deleted successfully!"
            })
        }
        else{
            return res.status(400).send({
                message: "You don't have the correct access privileges for this action"
            })
        }

    }
    else {
        return res.status(teamStatus).send(teamQuery.payload)
    }
}

module.exports = deleteTeam