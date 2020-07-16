const Router = require("express").Router();

//helper functions for simplifying code
const sendTeamInvite = require("../../functions/team/teamInvite/sendTeamInvite");
const cancelTeamInvite = require("../../functions/team/teamInvite/cancelTeamInvite");
const removeTeamMember = require("../../functions/team/teamInvite/removeTeamMembers");
const setTeam = require("../../functions/team/setTeam/setTeam");
const deleteTeam = require("../../functions/team/deleteTeam/deleteTeam");
const updateTeam = require("../../functions/team/updateTeam/updateTeam");
const getTeamInfo = require("../../functions/team/getTeam/getTeamInfo/getTeamInfo");
//authentication middleware
const checkAuth = require("../../middleware/checkAuth/checkAuth");

Router.get("/getteaminfo/:teamId", checkAuth, getTeamInfo);
Router.post("/setteam", checkAuth, setTeam);
Router.post("/sendinvite", checkAuth, sendTeamInvite);
Router.post("/cancelinvite", checkAuth, cancelTeamInvite);
Router.post("/removemembers", checkAuth, removeTeamMember);
Router.delete("/deleteteam/:teamId", checkAuth, deleteTeam);
Router.post("/updateteam/:teamId", checkAuth, updateTeam);

module.exports = Router;
