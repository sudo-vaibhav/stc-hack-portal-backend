const Event = require('../../../models/Event/Event');
const cleanUserSuppliedInput = require('../../cleanUserSuppliedInput/cleanUserSuppliedInput');

const updateEvent = async (req, res, next) => {
  const eventData = req.body;

  let dataRecords = cleanUserSuppliedInput(eventData);

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

module.exports = updateEvent;
