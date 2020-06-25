const express = require("express")
const Router = express.Router();
const mongoose = require("mongoose")


const Team = require('../models/Team');
const Event = require("../models/Event")
//helper functions for simplifying code
const sendInvite = require("../functions/team/invite/sendInvite")
const getUser = require("../functions/user/profile/getUser")
const cancelInvite = require("../functions/team/invite/cancelInvite")
const getTeam = require("../functions/team/getTeam/getTeam")
const removeMember = require("../functions/team/invite/removeMember")
const getTeamInfoByAccessLevel = require("../functions/team/getTeam/getTeamInfoByAccessLevel")
const setTeam = require("../functions/team/setTeam/setTeam")
//authentication middleware
const {
    checkAuth
} = require("../middleware/auth");

Router.get("/:teamId", checkAuth, async (req, res) => {
    const teamId = req.params.teamId;
    const userId = req.userId
    const teamQuery = await getTeam(teamId, "byId")

    if (teamQuery.status == 200) {
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
Router.post("/sendinvite", checkAuth, sendInvite)
Router.post("/cancelinvite", checkAuth, cancelInvite)
Router.post("/removemember", checkAuth, removeMember)

/*Router.patch("/updateTeam/:Id",(req,res,next) => {
  return res.status(200).json({
    message: "Team updated"
  })
})

Router.delete("/removeTeam/:Id", (req,res,next) => {
  return res.status(200).json({
    message: "Team deleted"
  })
})*/

module.exports = Router