const Team = require("../../../models/Team/Team");
const getUser = require("../../user/profile/getUser/getUser");
const getEvent = require("../../event/getEvent/getEvent");
const mongoose = require("mongoose");
const setTeam = async (req, res, next) => {
  const eventQuery = await getEvent(req.body.eventId, "byId");
  if (eventQuery.status == 200) {
    const creatorQuery = await getUser(req.userId, "byId");

    //this will check if user has completed their profile or not
    if (creatorQuery.status == 200) {
      //check if another event doesn't have the same team name
      const otherTeamWithSameName = await Team.findOne({
        eventId: req.body.eventId,
        teamName: req.body.teamName,
      });

      if (!otherTeamWithSameName) {
        //check if user doesn't already have a team in same event already
        Team.findOne({
          members: req.userId,
          eventId: req.body.eventId,
        })
          .then((otherTeam) => {
            if (otherTeam) {
              next(new Error("You already have a team for the same event"));
            } else {
              const team = new Team({
                ...req.body,
                members: [req.userId],
                pendingRequests: [],
                creatorId: req.userId,
                eventId: req.body.eventId,
                _id: new mongoose.Types.ObjectId().toString(),
              });
              team
                .save()
                .then(async (newTeam) => {
                  const creator = creatorQuery.payload;
                  creator.teams.addToSet(newTeam._id);
                  await creator.save();
                  return res.status(200).send(newTeam);
                })
                .catch((err) => {
                  console.log("error in adding team to user's document");
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            next(err);
          });
      } else {
        next(
          new Error(
            "Another team with same name for the same event already exists"
          )
        );
      }
    } else {
      next(new Error(creatorQuery.payload.message));
    }
  } else {
    next(new Error(eventQuery.payload.message));
  }
};

module.exports = setTeam;
