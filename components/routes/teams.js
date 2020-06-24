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
        teamInfo = getTeamInfoByAccessLevel(userId, team)
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

Router.post("/setteam", checkAuth, (req, res) => {
    Event.findById(req.body.eventId).select('-__v')
        .then(async (event) => {
            if (!event) {
                return res.status(404).send({
                    message: "No data found for this event"
                })
            } else {
                const creatorQuery = await getUser(req.userId, "byId")

                //this will check if user has completed their profile or not
                if (creatorQuery.status == 200) {
                    const team = new Team({
                        _id: new mongoose.Types.ObjectId().toString(),
                        creatorId: req.userId,
                        teamName: req.body.teamName,
                        eventId: req.body.eventId,
                        description: req.body.description,
                        members: [req.userId],
                        skillsRequired: req.body.skillsRequired || [],
                        pendingRequests: []
                    })
                    team.save()
                        .then(result => {
                            console.log("Team created: ", result)
                            return res.status(200).send(result)
                        })
                } else {
                    return res.status(creatorQuery.status).send(creatorQuery.message)
                }

            }


        })
        .catch(err => {
            return res.status(500).send({
                error: "Internal Server Error"
            })
        })
})

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