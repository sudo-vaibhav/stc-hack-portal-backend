const getTeam = require("../../team/getTeam/getTeam")
const getUser = require("../../user/profile/getUser")
const leaveTeam = async (req, res) => {
    const teamId = req.body.teamId
    const userId = req.userId

    //first get the team
    const teamQuery = await getTeam(teamId, "byId")
    const teamStatus = teamQuery.status
    if (teamStatus === 200) {
        const team = teamQuery.payload

        //check if requester is a member of the team or not
        if (team.members.includes(userId)) {

            // admin can't leave his own team
            if (team.creatorId === userId) {
                return res.status(400).send({
                    message: "Admin of team can't leave his/her own team. Try deleting team instead."
                })
            } else {

                //now you can leave the team 
                const userQuery = await getUser(userId, "byId")

                const userStatus = userQuery.status
                if (userStatus === 200) {
                    //update team document
                    const updatedTeamMembers = team.members.filter(memberId => memberId != userId)
                    team.members = updatedTeamMembers

                    //update user document
                    const user = userQuery.payload
                    const updatedUserTeams = user.teams.filter(team => team != teamId)
                    user.teams = updatedUserTeams

                    await Promise.all([team.save(), user.save()])
                    return res.status(200).send({
                        message: "successfully left the team"
                    })
                } else {
                    return res.status(userStatus).send(userQuery.payload)
                }

            }
        } else {
            return res.status(400).send({
                message: "You are not a member of this team"
            })
        }
    } else {
        return res.status(teamStatus).send(teamQuery.payload)
    }
}
module.exports = leaveTeam