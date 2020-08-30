const Event = require("../../../models/Event/Event");
const mongoose = require("mongoose");
const setEvent = async (req, res, next) => {
  const eventData = {
    ...req.body,
    creatorId: req.userId,
  };
  try {
    const event = new Event({
      ...eventData,
      _id: new mongoose.Types.ObjectId().toString(),
    });
    await event.save();
    return res.status(200).send(event.toJSON());
  } catch (err) {
    next(err);
  }
};

module.exports = setEvent;
