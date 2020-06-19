const getTeam = require("../team/getTeam")
const getUser = require("../user/getUser")

const rejectInvite = (req, res) => {
    const inviteeId = req.userId
    const {
        teamId
    } = req.body

    const inviteeQuery = getUser(inviteeId, "byId")

    //first check that team exists
    const teamQuery = await getTeam(teamId, "byId")
    if (teamQuery.status == 200) {
        //then check that user has an invite for that team or not
        const team = teamQuery.payload
        if (team.pendingRequests.includes(inviteeId)) {

            //also check that user has a pending request for the team in his/her records
            if (inviteeQuery.status == 200) {
                const invitee = inviteeQuery.payload
                // NOTE: theoretically this check should always pass as team.pendingRequests and user.invites
                // are meant to always be manipulated together in each route that deals with invites
                // so if team.pendingRequests.include(inviteeId) is true then then invitee.invites.includes(team._id)
                // should also be true
                if (invitee.invites.includes(teamId)) {
                    //proceed to remove the invite in both the user's document
                    // and the team document in their respective collections

                    //first lets modify team record
                    const updatedPendingRequests = team.pendingRequests
                    const indexOfInvitee = updatedPendingRequests.indexOf(inviteeId)
                    //splice removes the id of invitee from the array
                    updatedPendingRequests.splice(indexOfInvitee, 1)
                    team.pendingRequests = updatedPendingRequests

                    //next modify invitee records

                    const updatedUserInvites = invitee.invites
                    const indexOfTeam = updatedUserInvites.indexOf(teamId)
                    //splice removes the id of team from the array
                    updatedUserInvites.splice(indexOfTeam, 1)
                    invitee.invites = updatedUserInvites

                    //now save the updated documents in the user and teams collections
                    const updatedTeam = await team.save()
                    const updatedInvitee = await invitee.save()

                    return res.status(200).send(updatedInvitee)

                } else {
                    return res.status(400).send({
                        message: "No such invite was found in user records"
                    })
                }


            } else {
                return res.status(inviteeQuery.status).send(inviteeQuery.payload)
            }




        } else {
            return res.status(400).send({
                message: "No pending invites found for the user in the team"
            })
        }
    } else {
        return res.status(teamQuery.status).send(teamQuery.payload)
    }


}

module.exports = rejectInvite