//Helper Functions
const getUser = require("../../user/profile/getUser/getUser")
const getTeam = require("../getTeam/getTeam")

const removeTeamMember = async (req, res) => {
    const adminId = req.userId
    const teamId = req.body.teamId
    const memberId = req.body.memberId

    const adminQuery = await getUser(adminId, "byId")

    //check if admin exists
    if (adminQuery.status == 200) {
        //check if team exists
        const teamQuery = await getTeam(teamId, "byId")
        if (teamQuery.status == 200) {
            //check whether the user in this case is the admin of the team(i.e the admin has the authority to perform such actions)
            const team = teamQuery.payload
            if (team.creatorId == adminId) {
                //check whether the user to be removed exists
                const memberQuery = await getUser(memberId, "byId")
                if (memberQuery.status == 200) {
                    //check whether the members of the team include the user to be removed
                    const member = memberQuery.payload
                    if (team.members.includes(memberId)) {
                        //remove the memberId from the members array in the Team Schema and remove the teamId from the teams array in the User Schema and ensure that the member to be removed is not the admin
                        if (memberId != adminId) {
                            const members = team.members
                            members.splice(members.indexOf(memberId), 1)
                            team.members = members

                            const teams = member.teams
                            teams.splice(teams.indexOf(teamId), 1)
                            member.teams = teams

                            await Promise.all([member.save(), team.save()])

                            return res.status(201).send({
                                message: "User has been removed from the team"
                            })
                        } else {
                            return res.status(403).send({
                                message: "Admin can't remove himself/herself. Try deleting the team instea"
                            })
                        }
                    } else {
                        return res.status(404).send({
                            message: "No such user exists in the team"
                        })
                    }
                } else {
                    return res.status(memberQuery.status).send(memberQuery.payload)
                }
            } else {
                return res.status(403).send({
                    message: "You are not authorized to take such actions"
                })
            }
        } else {
            return res.status(teamQuery.status).send(teamQuery.payload)
        }
    } else {
        return res.status(adminQuery.status).send(adminQuery.payload)
    }
}

module.exports = removeTeamMember