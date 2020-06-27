const Squad = require("../../../models/Squad")
const processSquadQuery = (squad) =>{
    if (squad) {
        return {
            status: 200,
            payload: squad
        }
    } else {
        return {
            status: 404,
            payload: {
                message: "Squad not found"
            }
        }
    }
}
const getSquad = async (squadIdentifier,searchParameter) =>{
    //searchBy stores by querying by id
    let squad = undefined
    try {
        switch (searchParameter) {

            case "byId":
                squad = await Squad.findOne({
                    _id: squadIdentifier
                })
                return processSquadQuery(squad)

            default:
                // if no proper search parameter is given
                // search will be done by id
                squad = await Squad.findOne({
                    _id: squadIdentifier
                })
                return processSquadQuery(squad)
        }
    } catch (err) {
        return {
            status: 500,
            payload: {
                message: "Internal server error"
            }
        }
    }
}

module.exports = getSquad