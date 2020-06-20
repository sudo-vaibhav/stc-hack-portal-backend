//Helper function imports
const getTeam = require("../team/getTeam")
const getUser = require("../user/getUser")


const acceptInvite=  async (req,res) =>
{
  //to check if user exists
  const inviteeQuery =  await getUser(req.userId,"byId")
  //to check if team exists
  const teamQuery=  await getTeam(req.body.teamId,"byId")
  if(teamQuery.status == 200)
  {
    const team = teamQuery.payload
    //check whether the user has invite for team
    if(team.pendingRequests.includes(req.userId))
    {
      //generate users data
      if(inviteeQuery.status == 200)
      {
        const invitee= inviteeQuery.payload
        // NOTE: theoretically this check should always pass as team.pendingRequests and user.invites
        // are meant to always be manipulated together in each route that deals with invites
        // so if team.pendingRequests.include(inviteeId) is true then then invitee.invites.includes(team._id)
        // should also be true
        //check whether users invites include team id
        if(invitee.invites.includes(req.body.teamId))
        {
          //now let us modify the team schema by adding the userId to the members and removing the userId from the pendingRequests

          const members = team.members
          members.push(req.userId)
          team.members = members

          const pendingRequests = team.pendingRequests
          pendingRequests.splice(pendingRequests.indexOf(req.userId), 1)
          team.pendingRequests = pendingRequests

          //let us also modify the user schema by adding the the teamsId to the teams and remove the teamsId from the invites
          const teams = invitee.teams
          teams.push(team._id)
          invitee.teams = teams

          const invites = invitee.invites
          invites.splice(invites.indexOf(team._id), 1)
          invitee.invites = invites
          
          //save the updated team and user profiles
          const updatedTeam =  await team.save()
          const updatedInvitee=  await invitee.save()

          //return the updated Invitee profile
          return res.status(200).send(updatedInvitee)
        } 
        else{
          return res.status(400).send({
            message: "No Invite found from that team"
          })
        }
      } else {
      return res.status(inviteeQuery.status).send(inviteeQuery.payload)
      }
    }
    else{
      return res.status(400).send({
        message: "Invitee doesnt have any pending requests"
      })
    }
  }
  else
  {
    return res.status(teamQuery.status).send(teamQuery.payload)
  }
}

module.exports = acceptInvite