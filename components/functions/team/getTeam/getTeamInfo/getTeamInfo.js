const getTeam = require("../getTeam")
const getTeamInfoByAccessLevel = require("../getTeamInfoByAccessLevel/getTeamInfoByAccessLevel")
const getTeamInfo = async (req, res) => {
    const teamId = req.params.teamId;
    const userId = req.userId
    const teamQuery = await getTeam(teamId, "byId")

    if (teamQuery.status === 200) {
        const team = teamQuery.payload
        const teamInfo = await getTeamInfoByAccessLevel(userId, team)
        if (teamInfo) {
            return res.status(200).send(teamInfo)
        } else {
            return res.status(403).send({
                message: "You don't possess the adequate priviledges to access this team"
            })
        }
    } else {
        return res.status(teamQuery.status).send(teamQuery.payload)
    }
}

module.exports = getTeamInfo