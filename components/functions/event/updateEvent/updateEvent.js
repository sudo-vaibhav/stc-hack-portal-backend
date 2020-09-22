const Event = require("../../../models/Event/Event");
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput");
const { query } = require("express");

const updateEvent = function (req, res,next) {
  const eventData = req.body;
  delete eventData["_id"];
  delete eventData["creatorId"];
  let dataRecords = cleanUserSuppliedInput(eventData);

  const id = req.params.eventId;

  var update = Event.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: dataRecords},
    { 
      new: true, 
      runValidators: true, 
      context: query
    }
  );
  update
    .exec()
    .then((event) => {
      return res.status(200).send({
        message: "Event has been updated",
        updatedEvent: event
      })
    })
    .catch((err) => {
      next(err);
    });
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
