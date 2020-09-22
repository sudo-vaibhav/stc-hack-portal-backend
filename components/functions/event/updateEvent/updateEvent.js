const Event = require("../../../models/Event/Event");
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput");
const { query } = require("express");

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

/*const updateEvent = async (req,res,next) => {
  const eventData = req.body;
  delete eventData["_id"];
  delete eventData["creatorId"];
  const id = req.params.eventId;
  let dataRecords = cleanUserSuppliedInput(eventData);
  try{
    const event = await Event.findOneAndUpdate(
      {
        _id: id
      },
      { $set: dataRecords},
      {
        runValidators: true,
        new: true,
      }
    );
    return res.status(200).send(event);
  }
  catch (err) {
    next(err);
  }
}*/

module.exports = updateEvent;
