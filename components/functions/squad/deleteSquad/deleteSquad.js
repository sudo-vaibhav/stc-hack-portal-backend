const getSquad = require("../getSquad/getSquad")
const deleteSquad = async (req,res)=>{
    //first find the squad
    const userId = req.userId
    const squadId = req.params.squadId
    const squadQuery = await getSquad(squadId, "byId")

    const squadStatus = squadQuery.status
    if (squadStatus === 200) {
        const squad = squadQuery.payload
        //then check if requester is admin of that squad
        if (squad.creatorId === userId) {
            //then delete that squad
            await squad.remove() // removing all mentions of that squad
            // in users database will happen using post
            // middleware in squad schema 😃
            return res.status(200).send({
                message: "Squad deleted successfully!"
            })
        } else {
            return res.status(400).send({
                message: "You don't have the correct access privileges for this action"
            })
        }

    } else {
        return res.status(squadStatus).send(squadQuery.payload)
    }
}
module.exports = deleteSquad