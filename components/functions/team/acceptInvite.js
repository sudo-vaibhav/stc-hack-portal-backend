//Helper function imports
const getTeam = require("../team/getTeam");
const getUser = require("../user/getUser");

const acceptInvite=  (req,res) =>
{
  const inviteeQuery = getUser(req.userId,"byId")
  const teamQuery=  await getTeam(req.body.teamId,"byId")
  const teamStatus= teamQuery.status
  if(teamStatus == 200)
  {
    const team = teamQuery.payload
    //check whether the user has invite for team
    if(team.pendingRequests.includes(req.userId))
    {
      //generate users data
      if(inviteeQuery.status ==200){
        invitee= inviteeQuery.payload
        //check whether users invites include team id
        if(inviteeQuery.invites.includes(req.body.teamId))
        {
          //now let us modify the team schema by adding the userId to the members and removing the userId from the pendingRequests

          const members = team.members
          members.push(invitee._id)
          team.members = members

          const pendingRequests = team.pendingRequests
          pendingRequests.splice(pendingRequests.indexOf(invitee._id), 1)
          team.pendingRequests = pendingRequests

          //let us also modify the user schema by adding the the teamsId to the teams and remove the teamsId from the invites
          const teams = invitee.teams
          teams.push(invitedTeam._id)
          invitee.teams = teams

          const invites = invitee.invites
          invites.splice(invites.indexOf(team._id), 1)
          invitee.invites = invites

          const updatedTeam = await team.save()
          const updatedInvitee= await invitee.save()

          return res.status(201).send(updatedInvitee)

        }
        else{
          return res.status(400).send({
            message: "No Invite found for that team"
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
    return res.status(teamStatus).send(teamQuery.payload)
  }
}

module.exports = acceptInvite