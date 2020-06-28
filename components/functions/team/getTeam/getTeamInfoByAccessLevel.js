const getShareableTeamDocForInvitee = require("./getShareableDocs/getShareableTeamDocForInvitee")
const getShareableTeamDocForMember = require("./getShareableDocs/getShareableTeamDocForMember")
const populateTeamForMembersAndAdmin = require("../populateTeam/populateTeamForMembersAndAdmin")
const populateTeamWithCreator = require("../populateTeam/populateTeamWithCreator")
const getEvent = require("../../event/getEvent/getEvent")

const getTeamInfoByAccessLevel = async (userId, teamDoc) => {
    let team = {...teamDoc.toJSON()}

    //means user has a pending invite from this team 
    // or is a member or the admin
    if([...team.pendingRequests,...team.members].includes(userId)){
        
        //get event name from event id to put in response
        const eventQuery = await getEvent(team.eventId, "byId")
        const event = eventQuery.payload
        team.nameOfEvent = event.nameOfEvent

        //add info creator to the team object
        team = await populateTeamWithCreator(team)

        //means user is an invitee
        if (team.pendingRequests.includes(userId)) {
            return getShareableTeamDocForInvitee(team)
        }

        //means user is member
        else if(team.members.includes(userId)){ 
            let teamJSON = {...team}

            //means user is member of team but not admin
            if (userId != team.creatorId){
                teamJSON = getShareableTeamDocForMember(team)
            }
            return await populateTeamForMembersAndAdmin(teamJSON)
        }
    }
    //means you are neither admin, nor team member, and not even an invitee
    else {
        return null
    }
}

module.exports = getTeamInfoByAccessLevel