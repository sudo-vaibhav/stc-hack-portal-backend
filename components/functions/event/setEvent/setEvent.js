const Event = require("../../../models/Event/Event");
const mongoose = require("mongoose");
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput");
const setEvent = async (req, res) => {
  const eventData = cleanUserSuppliedInput({
    ...req.body,
    creatorId: req.userId,
  });
  //we need to initialize the model because without it,
  //mongoose won't ensure that event name is unique even
  //after you tell it that unique:true  in Event schema 😕
  //read more about it here: https://mongoosejs.com/docs/faq.html#unique-doesnt-work
  Event.init().then(() => {
    const event = new Event({
      ...eventData,
      _id: new mongoose.Types.ObjectId().toString(),
    });
    event
      .save()
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => {
        return res.status(400).send({
          message: "Event name not unique or Event validation failed",
        });
      });
  });
};

module.exports = setEvent;
