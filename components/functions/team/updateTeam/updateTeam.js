//Helper Functions
const getTeam = require("../getTeam/getTeam")

const updateTeam = async (req,res)=>{
    //first find the team
    const adminId = req.userId
    const teamId = req.params.teamId
    const teamQuery = await getTeam(teamId,"byId")


    //check if team exists
    if(teamQuery.status == 200)
    {
        const team = teamQuery.payload
        //then check if the user is the admin of the team
        if(team.creatorId == adminId)
        {
            //then delete that team
            delete team.creatorId, team._id, team.eventId, team.members, team.pendingRequests
            team.update(req.body)
                .exec()
                .then(result =>{
                 res.status(200).send({
                message: "Team updated successfully!"
                })
              })
                .catch(err => {
                  res.status(500).send({
                    message: "Internal Server Error"
                  })
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

module.exports = updateTeam