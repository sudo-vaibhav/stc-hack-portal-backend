const getUser = require("../../user/profile/getUser")
const getShareableUserDocs = require("../../user/getShareableUserDocs/getShareableUserDocs")
const populateTeamForMembersAndAdmin = async (teamData) => {
    const team = {...teamData}

    const memberDocs = []

    //this will only get triggered for admin and all other members
    for(const member of team.members ){
        memberDocQuery = await getUser(member,"byId")
        memberDocs.push(memberDocQuery.payload.toJSON()) //payload contains the actual user objects
                                                         //we do .JSON() to remove other mongoose methods
    }
    team.membersInfo = getShareableUserDocs(memberDocs)


    //this will only get triggered for admin only
    if(team.pendingRequests){
        const inviteeDocs = []
        for (const invitee of team.pendingRequests) {
            inviteeDocQuery = await getUser(invitee, "byId")
            inviteeDocs.push(inviteeDocQuery.payload.toJSON()) //payload contains the actual user objects
                                                        //we do .JSON() to remove other mongoose methods
        }
        team.pendingRequestsInfo = getShareableUserDocs(inviteeDocs)
    }

    return team
}

module.exports = populateTeamForMembersAndAdmin