const Event = require("../../../models/Event/Event");
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput");

const updateEvent = async (req, res, next) => {
  const eventData = req.body;

  let dataRecords = cleanUserSuppliedInput(eventData);

  const id = req.params.eventId;
  try {
    var update = await Event.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: dataRecords },
      {
        omitUndefined: true,
        runValidators: true,
        new: true,
      }
    );
    return res.status(200).send(update);
  } catch (err) {
    next(err);
  }
};

module.exports = updateEvent;
