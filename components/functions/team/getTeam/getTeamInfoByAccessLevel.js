const getShareableTeamDocForInvitee = require("./getShareableDocs/getShareableTeamDocForInvitee")
const getShareableTeamDocForMember = require("./getShareableDocs/getShareableTeamDocForMember")

const getTeamInfoByAccessLevel = (userId, team) => {
    //means user has a pending invite from this team
    if (team.pendingRequests.includes(userId)) {
        return getShareableTeamDocForInvitee(team)
    }

    //means user is admin of team
    else if (userId == team.creatorId) {
        return team
    }

    //means user is member of team but not admin
    else if (team.members.includes(userId) && userId != team.creatorId) {
        return getShareableTeamDocForMember(team)
    }

    //means you are neither admin, nor team member, and not even an invitee
    else {
        return null
    }
}

module.exports = getTeamInfoByAccessLevel