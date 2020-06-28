const getUser = require("../getUser/getUser")
const populateUserWithTeamsInfo = require("../populateUserWithTeamInfo/populateUserWithTeamInfo")
const getUserProfile = async (req, res) => {
    const responseData = await getUser(req.userId, "byId")
    const statusCode = responseData.status
    const payload = responseData.payload
    if (statusCode == 200) {
        const userWithTeamInfo = await populateUserWithTeamsInfo(payload)
        return res.status(statusCode).send(userWithTeamInfo)
    } else {
        return res.status(statusCode).send(payload)
    }
}
module.exports = getUserProfile