const getShareableSquadDocForMember = require("../../getShareableSquadDocs/getShareableSquadDocForMember");
const getShareableSquadDocForInvitee = require("../../getShareableSquadDocs/getShareableSquadDocForInvitee");
const populateSquadWithCreator = require("../../populateSquad/populateSquadWithCreator/populateSquadWithCreator");
const populateSquadForMembersAndAdmin = require("../../populateSquad/populateSquadForMembersAndAdmin/populateSquadForMembersAndAdmin");
const getSquadInfoByAccessLevel = async (userId, squad) => {
  //means user has a pending invite from this squad
  let squadJSON = squad.toJSON();
  squadJSON = await populateSquadWithCreator(squadJSON);

  //means user is an invitee
  if (squadJSON.pendingRequests.includes(userId)) {
    return getShareableSquadDocForInvitee(squadJSON);
  }

  //means user is member of squad (could be admin also)
  else if (squadJSON.members.includes(userId)) {
    //means user is member of squad (non-admin)
    if (userId != squadJSON.creatorId) {
      squadJSON = getShareableSquadDocForMember(squadJSON);
    }

    return await populateSquadForMembersAndAdmin(squadJSON);
  }

  //means you are neither admin, nor squad member, and not even an invitee
  else {
    return null;
  }
};

module.exports = getSquadInfoByAccessLevel;
