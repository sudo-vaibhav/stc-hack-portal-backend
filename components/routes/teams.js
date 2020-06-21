const express = require("express")
const Router = express.Router();
const mongoose = require("mongoose")


const Team = require('../models/Team');
const Event = require("../models/Event")
//helper functions for simplifying code
const sendInvite = require("../functions/team/invite/sendInvite")
const getUser = require("../functions/user/profile/getUser")
const cancelInvite = require("../functions/team/invite/cancelInvite")

//authentication middleware
const {
    checkAuth
} = require("../middleware/auth");


Router.get("/:teamId", checkAuth, (req, res) => {
    const teamId = req.params.teamId;
    Team.findById(teamId)
        .exec()
        .then(team => {
            if (team) {
                //check so that only people who are either members or
                //have pending invites from the team can get information
                //about the team due to privacy concerns
                if (team.members.includes(req.userId) || team.pendingRequests.includes(req.userId)) {
                    return res.status(200).send(team)
                } else {
                    return res.status(403).send({
                        message: "You don't have the adequate privileges to access this resource"
                    })
                }

            } else {
                return res.status(404).send({
                    message: "Team not found"
                })
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal Servor Error"
            })
        })
})

Router.post("/setteam", checkAuth, (req, res) => {
    Event.findById(req.body.eventId)
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