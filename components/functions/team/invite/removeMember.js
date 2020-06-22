
//Helper Functions
const getUser= require("../../user/profile/getUser")
const getTeam = require("../getTeam")

const removeMember = async (req,res) =>
{
  const adminId=req.userId
  const teamId=req.body.teamId
  const inviteeId=req.body.inviteeId

  const adminQuery= await getUser(adminId,"byId")

  //check if user exists
  if(adminQuery.status == 200)
  {
    //check if team exists
    const teamQuery = await getTeam(teamId,"byId")
    if(teamQuery.status ==200)
    {
      //check whether the user in this case is the admin of the team(i.e the admin has the authority to perform such actions)
      const team = teamQuery.payload
      if(team.creatorId == adminId)
      {
        //check whether the user to be removed exists
        const inviteeQuery= await getUser(inviteeId,"byId")
        if(inviteeQuery.status ==200)
        {
          //check whether the members of the team include the user to be removed
          const invitee = inviteeQuery.payload
          if(team.members.includes(inviteeId))
          {
            //remove the inviteeId from the members array in the Team Schema and remove the teamId from the teams array in the User Schema

            const members = team.members
            members.splice(members.indexOf(inviteeId), 1)
            team.members = members

            const teams = invitee.teams
            teams.splice(teams.indexOf(teamId), 1)
            invitee.teams = teams
            
            await Promise.all([invitee.save(), team.save()])

            return res.status(201).send({
              message: "User has been removed from the team"
            })
          }else{
            return res.status(404).send({
              message: "No such user exists in this team"
            })
          }
        }else{
          return res.status(inviteeQuery.status).send(inviteeQuery.payload)
        }
      }else{
        return res.status(403).send({
          message: "You are not authorized to perform such actions"
        })
      }
    }else{
      return res.status(teamQuery.status).send(teamQuery.payload)
    }
  }else{
    return res.status(adminQuery.status).send(adminQuery.payload)
  }
}

module.exports = removeMember