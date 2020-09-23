const Event = require('../../../models/Event/Event');
const cleanUserSuppliedInput = require('../../cleanUserSuppliedInput/cleanUserSuppliedInput');

const updateEvent = async (req, res, next) => {
  const dataRecords = cleanUserSuppliedInput(req.body);
  const id = req.params.eventId;
  try {
    const event = await Event.findOne({
      _id: id,
    });

    if (event) {
      Object.keys(req.body).forEach((key) => {
        event[key] = req.body[key];
      });
    }
    await event.save();
    console.log(event);
    return res.status(200).send(event);
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
