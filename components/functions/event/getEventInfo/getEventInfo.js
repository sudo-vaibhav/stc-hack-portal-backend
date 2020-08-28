const Event = require("../../../models/Event/Event");
const getUser = require("../../user/profile/getUser/getUser");
const Team = require("../../../models/Team/Team");
const getEventInfo = async (req, res) => {
  const eventId = req.params.eventId;
  Event.findById(eventId)
    .populate("creator", "name email")
    .exec(async (err, doc) => {
      if (doc) {
        // now we add a boolean to tell if this user has a team for the hack already
        const existingTeam = await Team.findOne({
          eventId: eventId,
          members: req.userId,
        });

        let hasTeamForEvent = false;
        if (existingTeam) {
          hasTeamForEvent = true;
        }

        return res.status(200).send({
          ...doc.toJSON({
            virtuals: true,
          }),
          hasTeamForEvent,
        });
      } else {
        return res.status(404).send({
          message: "No Data Found!",
        });
      }
    });
};

module.exports = getEventInfo;
