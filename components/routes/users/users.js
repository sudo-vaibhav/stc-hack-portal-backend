const Router = require("express").Router()

//importing helper functions for simplifying operations
const setProfile = require("../../functions/user/profile/setProfile/setProfile")
const getProfiles = require("../../functions/user/profile/getProfiles/getProfiles")
const acceptTeamInvite = require("../../functions/user/invites/teamInvites/acceptTeamInvite/acceptTeamInvite")
const rejectTeamInvite = require("../../functions/user/invites/teamInvites/rejectTeamInvite/rejectTeamInvite")
const leaveTeam = require("../../functions/user/leaveTeam/leaveTeam")
const leaveSquad = require("../../functions/user/leaveSquad/leaveSquad")
const acceptSquadInvite = require("../../functions/user/invites/squadInvites/acceptSquadInvite/acceptSquadInvite")
const rejectSquadInvite = require("../../functions/user/invites/squadInvites/rejectSquadInvite/rejectSquadInvite")
const searchUserProfiles = require("../../functions/user/profile/searchUserProfiles/searchUserProfiles")
const getUserProfile = require("../../functions/user/profile/getUserProfile/getUserProfile")
const updateUserProfile = require("../../functions/user/profile/updateUserProfile/updateUserProfile")

Router.post("/setprofile", setProfile)
Router.get("/getuserprofile", getUserProfile)
Router.get("/getprofiles/:pageNo", getProfiles)
Router.post("/acceptteaminvite", acceptTeamInvite)
Router.post("/rejectteaminvite", rejectTeamInvite)
Router.post("/acceptsquadinvite", acceptSquadInvite)
Router.post("/rejectsquadinvite",rejectSquadInvite)
Router.post("/searchuserprofiles/:pageNo", searchUserProfiles)
Router.post("/leaveteam",leaveTeam)
Router.post("/leavesquad",leaveSquad)
Router.patch("/updateuserprofile",updateUserProfile )

module.exports = Router