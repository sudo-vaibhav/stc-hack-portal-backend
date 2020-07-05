const Event = require("../../../models/Event/Event");
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput");

const updateEvent = function (req, res) {
  let dataRecords = cleanUserSuppliedInput({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    description: req.body.description,
    eventUrl: req.body.eventUrl,
    minimumTeamSize: req.body.minimumTeamSize,
    maximumTeamSize: req.body.maximumTeamSize,
    eventImage: req.body.eventImage,
  });

  const id = req.params.eventId;

  var update = Event.findOneAndUpdate(
    {
      _id: id,
    },
    dataRecords,
    {
      omitUndefined: true,
    }
  );
  update
    .exec()
    .then((event) => {
      return res.status(200).send({
        message: "Event has been updated",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Internal Server Error",
      });
    });
};

module.exports = updateEvent;
