const getTeam = require("../../../team/getTeam/getTeam")


const populateUserWithTeamInfo = async (user) => {
    const userObject = {
        ...user.toJSON()
    }
    const teamInfoQueries = []
    const inviteInfoQueries = []
    for (const team of userObject.teams) {
        teamInfoQueries.push(getTeam(team, "byId")) //this will return promises, we will await for their resolution later
    }

    for (const invite of userObject.invites) {
        inviteInfoQueries.push(getTeam(invite, "byId")) //this will return promises, we will await for their resolution later
    }

    const teamsInfo = []
    const invitesInfo = []
    for await (const teamQuery of teamInfoQueries) { // we are awaiting for each promise to get resolved
        const {
            _id,
            teamName,
            creatorId
        } = teamQuery.payload
        teamsInfo.push({
            _id,
            teamName,
            creatorId
        })
    }

    for await (const inviteQuery of inviteInfoQueries) {   // we are awaiting for each promise to get resolved
        const {
            _id,
            teamName,
            creatorId
        } = inviteQuery.payload
        invitesInfo.push({
            _id,
            teamName,
            creatorId
        })
    }

    //now populate the user object
    userObject.teamsInfo = teamsInfo
    userObject.invitesInfo = invitesInfo

    return userObject

}

module.exports = populateUserWithTeamInfo