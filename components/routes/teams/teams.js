const Router = require("express").Router();

//helper functions for simplifying code
const sendTeamInvite = require("../../functions/team/teamInvite/sendTeamInvite")
const cancelTeamInvite = require("../../functions/team/teamInvite/cancelTeamInvite")
const getTeam = require("../../functions/team/getTeam/getTeam")
const removeTeamMember = require("../../functions/team/teamInvite/removeTeamMember")
const getTeamInfoByAccessLevel = require("../../functions/team/getTeam/getTeamInfoByAccessLevel/getTeamInfoByAccessLevel")
const setTeam = require("../../functions/team/setTeam/setTeam")
const deleteTeam = require("../../functions/team/deleteTeam/deleteTeam")
const updateTeam = require("../../functions/team/updateTeam/updateTeam")

//authentication middleware
const checkAuth= require("../../middleware/checkAuth/checkAuth");

Router.get("/getteaminfo/:teamId", checkAuth, async (req, res) => {
    const teamId = req.params.teamId;
    const userId = req.userId
    const teamQuery = await getTeam(teamId, "byId")

    if (teamQuery.status === 200) {
        const team = teamQuery.payload
        teamInfo = await getTeamInfoByAccessLevel(userId, team)
        if(teamInfo){
            return res.status(200).send(teamInfo)
        }
        else{
            return res.status(403).send({
                message: "You don't possess the adequate priviledges to access this team"
            })
        }
    } else {
        return res.status(teamQuery.status).send(teamQuery.payload)
    }
})

Router.post("/setteam", checkAuth, setTeam)
Router.post("/sendinvite", checkAuth, sendTeamInvite)
Router.post("/cancelinvite", checkAuth, cancelTeamInvite)
Router.post("/removemember", checkAuth, removeTeamMember)
Router.post("/deleteteam/:teamId",checkAuth, deleteTeam)
Router.patch("/updateteam/:teamId",checkAuth, updateTeam)

module.exports = Router