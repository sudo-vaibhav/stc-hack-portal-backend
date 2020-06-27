const getTeam = require("../../functions/team/getTeam/getTeam")
const getUser = require("../user/profile/getUser")

const deleteEvent = async (req, res) => {
    const memberId = req.userId
    console.log("user id is:", memberId)
    const {
        teamId
    } = req.body


    const memberQuery = await getUser(memberId, "byId")
    //first check that team exists
    const teamQuery = await getTeam(teamId, "byId")
    if (teamQuery.status == 404) {
        //then check that user has an invite for that team or not
        const team = teamQuery.payload
        if (!team.pendingRequests.includes(memberId)) {

            //also check that user has a pending request for the team in his/her records
            if (memberQuery.status == 200) {
                const member = memberQuery.payload
                // NOTE: theoretically this check should always pass as team.pendingRequests and user.invites
                // are meant to always be manipulated together in each route that deals with invites
                // so if team.pendingRequests.include(inviteeId) is true then then invitee.invites.includes(team._id)
                // should also be true
                if (member.invites.includes(teamId)) {
                    //proceed to remove the invite in both the user's document
                    // and the team document in their respective collections

                    //first lets modify user record
                    const updatedUserTeams = member.teams
                    //splice removes the id of invitee from the array
                    updatedUserTeams.splice(updatedUserTeams.indexOf(teamId), 1)
                    member.teams = updatedUserTeams

                    //next modify invitee records

                    const updatedUserInvites = member.invites
                    const indexOfTeam = updatedUserInvites.indexOf(teamId)
                    //splice removes the id of team from the array
                    updatedUserInvites.splice(indexOfTeam, 1)
                    member.invites = updatedUserInvites

                    //now save the updated documents in the user and teams collections
                    const updatedTeam = await team.save()
                    const updatedMember = await invitee.save()

                    return res.status(200).send({
                        message: "operation event delete completed successfully"
                    })

                } else {
                    return res.status(400).send({
                        message: "No such invite was found in user records"
                    })
                }


            } else {
                return res.status(memberQuery.status).send(memberQuery.payload)
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

module.exports = deleteEvent