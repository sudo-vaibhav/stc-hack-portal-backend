const getUser = require("../../../user/profile/getUser/getUser")
const getShareableUserDocs = require("../../../user/getShareableUserDocs/getShareableUserDocs")
const populateSquadWithCreator = async (squadInfo)=>{
    const squadJSON = {...squadInfo}
    const userId = squadJSON.creatorId
    const creatorQuery = await getUser(userId,"byId")
    const creator = creatorQuery.payload.toJSON()
    squadJSON.creatorInfo = getShareableUserDocs([creator])[0]
    return squadJSON
}

module.exports = populateSquadWithCreator