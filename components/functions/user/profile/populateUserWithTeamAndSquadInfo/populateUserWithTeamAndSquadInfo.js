const getTeam = require("../../../team/getTeam/getTeam");
const getSquad = require("../../../squad/getSquad/getSquad");

const populateUserWithTeamAndSquadInfo = async (user) => {
  const userObject = {
    ...user.toJSON(),
  };
  const teamInfoQueries = [];
  const teamInviteInfoQueries = [];
  const squadInfoQueries = [];
  const squadInviteInfoQueries = [];
  for (const team of userObject.teams) {
    teamInfoQueries.push(getTeam(team, "byId")); //this will return promises, we will await for their resolution later
  }

  for (const teamInvite of userObject.teamInvites) {
    teamInviteInfoQueries.push(getTeam(teamInvite, "byId")); //this will return promises, we will await for their resolution later
  }

  for (const squad of userObject.squads) {
    squadInfoQueries.push(getSquad(squad, "byId")); //this will return promises, we will await for their resolution later
  }

  for (const squadInvite of userObject.squadInvites) {
    squadInviteInfoQueries.push(getSquad(squadInvite, "byId")); //this will return promises, we will await for their resolution later
  }

  const teamsInfo = [];
  const teamInvitesInfo = [];
  const squadsInfo = [];
  const squadInvitesInfo = [];
  for await (const teamQuery of teamInfoQueries) {
    // we are awaiting for each promise to get resolved
    const { _id, teamName, creatorId, description } = teamQuery.payload;
    teamsInfo.push({
      _id,
      teamName,
      creatorId,
      description,
    });
  }

  for await (const teamInviteQuery of teamInviteInfoQueries) {
    // we are awaiting for each promise to get resolved
    const { _id, teamName, creatorId, description } = teamInviteQuery.payload;
    teamInvitesInfo.push({
      _id,
      teamName,
      creatorId,
      description,
    });
  }

  for await (const squadQuery of squadInfoQueries) {
    // we are awaiting for each promise to get resolved
    const { _id, squadName, creatorId, description } = squadQuery.payload;
    squadsInfo.push({
      _id,
      squadName,
      creatorId,
      description,
    });
  }
  for await (const squadInviteQuery of squadInviteInfoQueries) {
    // we are awaiting for each promise to get resolved
    const { _id, squadName, creatorId, description } = squadInviteQuery.payload;
    squadInvitesInfo.push({
      _id,
      squadName,
      creatorId,
      description,
    });
  }
  //now populate the user object
  userObject.teamsInfo = teamsInfo;
  userObject.teamInvitesInfo = teamInvitesInfo;
  userObject.squadsInfo = squadsInfo;
  userObject.squadInvitesInfo = squadInvitesInfo;

  return userObject;
};

module.exports = populateUserWithTeamAndSquadInfo;
