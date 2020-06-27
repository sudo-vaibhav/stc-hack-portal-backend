const getUser = require("../../user/profile/getUser")
const getShareableUserDocs = require("../../user/getShareableUserDocs/getShareableUserDocs")
const populateTeamWithCreator = async (teamInfo)=>{
    const teamJSON = {
        ...teamInfo
    }
    const userId = teamJSON.creatorId
    const creatorQuery = await getUser(userId, "byId")
    const creator = creatorQuery.payload.toJSON()
    teamJSON.creatorInfo = getShareableUserDocs([creator])[0]
    return teamJSON
}

module.exports = populateTeamWithCreator