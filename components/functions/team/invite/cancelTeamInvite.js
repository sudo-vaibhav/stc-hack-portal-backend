const getUser = require("../../user/profile/getUser")
const getTeam = require("../getTeam/getTeam")

const cancelTeamInvite = async (req, res) => {
    const adminId = req.userId
    const {
        teamId,
        inviteeId
    } = req.body

    const adminQuery = await getUser(adminId, "byId")

    // first check that admin user exists
    if (adminQuery.status == 200) {
        // then check if team exists
        const teamQuery = await getTeam(teamId, "byId")
        if (teamQuery.status == 200) {
            const team = teamQuery.payload
            // check if user is actually the admin of the group
            if (team.creatorId == adminId) {
                // check if team has a pending request for the invitee
                if (team.pendingRequests.includes(inviteeId)) {
                    const inviteeQuery = await getUser(inviteeId, "byId")
                    if (inviteeQuery.status == 200) {
                        // check if invitee actually has an invite from the team
                        const invitee = inviteeQuery.payload
                        if (invitee.invites.includes(teamId)) {
                            // modify the team document
                            const updatedPendingRequests = team.pendingRequests
                            const indexOfInvitee = updatedPendingRequests.indexOf(inviteeId)
                            updatedPendingRequests.splice(indexOfInvitee, 1)
                            team.pendingRequests = updatedPendingRequests

                            // modify the invitee document
                            const updatedUserInvites = invitee.invites
                            const indexOfTeam = updatedUserInvites.indexOf(teamId)
                            updatedUserInvites.splice(indexOfTeam, 1)
                            invitee.invites = updatedUserInvites

                            // save both documents simultaneously
                            // (minor optimisation over separate await statements
                            // as total time taken to save both events will be max of
                            // time taken by individual document to save and not sum of
                            // time taken individually to save both documents)
                            await Promise.all([invitee.save(), team.save()])

                            // return 200 response
                            return res.status(200).send({
                                message: "invite cancelled successfully"
                            })
                        } else {
                            res.status(400).send({
                                message: "No existing invite from the team found in invitee's records"
                            })
                        }
                    } else {
                        return res.status(inviteeQuery.status).send(inviteeQuery.payload)
                    }
                } else {
                    return res.status(400).send({
                        message: "No existing invites found for the user in team records"
                    })
                }

            } else {
                return res.status(403).send({
                    message: "You are not the admin of this team"
                })
            }
        } else {
            return res.status(teamQuery.status).send(teamQuery.payload)
        }
    } else {
        return res.status(adminQuery.status).send(adminQuery.payload)
    }
}

module.exports = cancelTeamInvite