const getSquad = require("../getSquad/getSquad")
const getSquadInfoByAccessLevel = require("./getSquadInfoByAccessLevel/getSquadInfoByAccessLevel")

const getSquadInfo = async (req, res) => {
    const squadId = req.params.squadId;
    const userId = req.userId
    const squadQuery = await getSquad(squadId, "byId")

    if (squadQuery.status === 200) {
        const squad = squadQuery.payload
        const squadInfo = await getSquadInfoByAccessLevel(userId, squad)
        if (squadInfo) {
            return res.status(200).send(squadInfo)
        } else {
            return res.status(403).send({
                message: "You don't possess the adequate priviledges to access this squad"
            })
        }
    } else {
        return res.status(squadQuery.status).send(squadQuery.payload)
    }
}
module.exports = getSquadInfo