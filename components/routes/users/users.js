const Router = require("express").Router();

//importing helper functions for simplifying operations
const setUserProfile = require("../../functions/user/profile/setUserProfile/setUserProfile");
const getProfiles = require("../../functions/user/profile/getProfiles/getProfiles");
const acceptTeamInvite = require("../../functions/user/invites/teamInvites/acceptTeamInvite/acceptTeamInvite");
const rejectTeamInvite = require("../../functions/user/invites/teamInvites/rejectTeamInvite/rejectTeamInvite");
const leaveTeam = require("../../functions/user/leaveTeam/leaveTeam");
const leaveSquad = require("../../functions/user/leaveSquad/leaveSquad");
const acceptSquadInvite = require("../../functions/user/invites/squadInvites/acceptSquadInvite/acceptSquadInvite");
const rejectSquadInvite = require("../../functions/user/invites/squadInvites/rejectSquadInvite/rejectSquadInvite");
const searchUserProfiles = require("../../functions/user/profile/searchUserProfiles/searchUserProfiles");
const getUserProfile = require("../../functions/user/profile/getUserProfile/getUserProfile");
const updateUserProfile = require("../../functions/user/profile/updateUserProfile/updateUserProfile");
const getUserById = require("../../functions/user/profile/getUserById/getUserById");
const signout = require("../../functions/user/signout/signout");

Router.post("/setuserprofile", setUserProfile);
Router.get("/getuserprofile", getUserProfile);
Router.patch("/updateuserprofile", updateUserProfile);

Router.patch("/acceptteaminvite/:teamId", acceptTeamInvite);
Router.patch("/rejectteaminvite/:teamId", rejectTeamInvite);
Router.patch("/leaveteam/:teamId", leaveTeam);

Router.patch("/acceptsquadinvite/:squadId", acceptSquadInvite);
Router.patch("/rejectsquadinvite/:squadId", rejectSquadInvite);
Router.patch("/leavesquad/:squadId", leaveSquad);

Router.get("/getuserprofiles/:pageNo", getProfiles);
Router.post("/searchuserprofiles/:pageNo", searchUserProfiles);

Router.get("/signout", signout);

Router.get("/:userId", getUserById);

module.exports = Router;
