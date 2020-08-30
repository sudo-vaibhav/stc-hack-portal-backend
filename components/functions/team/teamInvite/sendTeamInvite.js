const Team = require("../../../models/Team/Team");
const getUser = require("../../user/profile/getUser/getUser");
const getEvent = require("../../event/getEvent/getEvent");

const sendTeamInvite = async (req, res, next) => {
  // team id, user email, and only admin of
  // team should be able to send this invite

  const { inviteeEmail, teamId } = req.body;
  Team.findOne(
    {
      _id: teamId,
    },
    async (err, team) => {
      if (err) {
        next(new Error("Internal Server Error"));
      } else {
        if (team) {
          //first check that requester for inviting is the team admin
          if (req.userId == team.creatorId) {
            //check that team is not full already
            const eventQuery = await getEvent(team.eventId, "byId");
            const eventStatus = eventQuery.status;
            if (eventStatus == 200) {
              const event = eventQuery.payload;
              if (team.members.length >= event.maximumTeamSize) {
                next(new Error("Team is already full"));
              } else {
                //check that invitee should exist in user database
                const userQuery = await getUser(inviteeEmail, "byEmail");
                const userStatus = userQuery.status;

                //means user was found
                if (userStatus == 200) {
                  const invitee = userQuery.payload;
                  //check that invitee should not be in this team already
                  if (team.members.includes(invitee._id)) {
                    next(new Error("Invitee is already in your team"));
                  }

                  //check that invitee does not already have a request form the same team
                  if (team.pendingRequests.includes(invitee._id)) {
                    next(
                      new Error(
                        "Invitee already has a pending request for this team"
                      )
                    );
                  }

                  //check that invitee should not be in another team for the same event

                  Team.findOne(
                    {
                      eventId: team.eventId,
                      members: invitee._id,
                    },
                    async (err, otherTeamofInvitee) => {
                      if (err) {
                        next(new Error("Internal Server Error"));
                      } else {
                        //means user is already in some other team for the same event
                        if (otherTeamofInvitee) {
                          new Error(
                            "Invitee is already in another team for the same Event"
                          );
                        } else {
                          //now you have passed all checks and can invite the invitee to your team

                          //here team represents that team in which you originally wanted
                          // to invite the user in
                          let pendingRequests = team.pendingRequests;
                          pendingRequests.push(invitee._id);
                          team.pendingRequests = pendingRequests;

                          //also add the team to invitee's invites array
                          // so that invitee can also be informed
                          invitee.teamInvites.push(team._id);

                          try {
                            //update records of both the team and invitee
                            await Promise.all([team.save(), invitee.save()]);
                            return res.status(200).send({
                              message: "Invite sent successfully",
                            });
                          } catch (err) {
                            next(err);
                          }
                        }
                      }
                    }
                  );
                } else {
                  next(new Error(userQuery.payload.message));
                }
              }
            } else {
              next(new Error(eventQuery.payload.message));
            }
          } else {
            //runs when the requester wasn't admin of the team
            next(
              new Error(
                "You don't possess the right access priviledges to make this request"
              )
            );
          }
        } else {
          next(new Error("team not found"));
        }
      }
    }
  );
};

module.exports = sendTeamInvite;
