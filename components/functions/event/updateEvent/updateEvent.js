const Event = require("../../../models/Event/Event");
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput");

const updateEvent = function (req, res) {
  const eventData = req.body;
  delete eventData["_id"];
  delete eventData["creatorId"];
  let dataRecords = cleanUserSuppliedInput(eventData);

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
