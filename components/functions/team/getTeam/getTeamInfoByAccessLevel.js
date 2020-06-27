const getShareableTeamDocForInvitee = require("./getShareableDocs/getShareableTeamDocForInvitee")
const getShareableTeamDocForMember = require("./getShareableDocs/getShareableTeamDocForMember")

const populateTeamWithMembersAndAdmin = require("../populate/populateTeamWithMembersAndAdmin")
const getTeamInfoByAccessLevel = async (userId, team) => {
    //means user has a pending invite from this team
    if (team.pendingRequests.includes(userId)) {
        return getShareableTeamDocForInvitee(team)
    }

    if(team.members.includes(userId)){ 
        let teamJSON = team.toJSON()

        //means user is admin of team
        if (userId != team.creatorId){
            teamJSON = getShareableTeamDocForMember(team)
        }

        return await populateTeamWithMembersAndAdmin(teamJSON)

    }

    //means you are neither admin, nor team member, and not even an invitee
    else {
        return null
    }
}

module.exports = getTeamInfoByAccessLevel