const getUser = require("../../user/profile/getUser/getUser")
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
                        if (invitee.teamInvites.includes(teamId)) {
                            // modify the team document
                            team.pendingRequests = team.pendingRequests.filter(pendingRequest=>pendingRequest!=inviteeId)
                            // modify the invitee document
                            invitee.teamInvites = invitee.teamInvites.filter(invite=>invite!=teamId)

                            // save both documents simultaneously in parallel
                            await Promise.all([invitee.save(), team.save()])
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