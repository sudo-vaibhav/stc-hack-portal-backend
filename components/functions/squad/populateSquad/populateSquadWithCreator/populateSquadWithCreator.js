const getUser = require("../../../user/profile/getUser")
const populateSquadWithCreator = async (squadJSON)=>{
    const userId = squadJSON._id
    const creatorQuery = await getUser(userId,"byId")
    const creator = creatorQuery.payload

    squadJSON.creatorInfo = {...creator}
    return squadJSON
}

module.exports = populateSquadWithCreator