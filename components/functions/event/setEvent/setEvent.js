const Event = require("../../../models/Event/Event");
const mongoose = require("mongoose");
// const multer = require("multer")
// const fileUpload = require("../../upload/fileUpload/fileUpload")
// const fileStorage= require("../../upload/fileStorage/fileStorage")
// const fileFilter = require("../../upload/fileFilter/fileFilter")
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput");
const setEvent = async (req, res) => {
  console.log(req.file);
  const {
    endDate,
    startDate,
    location,
    nameOfEvent,
    description,
    eventUrl,
    minimumTeamSize,
    maximumTeamSize,
    eventImage,
  } = req.body;
  const eventData = cleanUserSuppliedInput({
    endDate,
    startDate,
    location,
    nameOfEvent,
    description,
    eventUrl,
    minimumTeamSize,
    maximumTeamSize,
    eventImage,
    m,
  });
  //we need to initialize the model because without it,
  //mongoose won't ensure that event name is unique even
  //after you tell it that unique:true  in Event schema 😕
  //read more about it here: https://mongoosejs.com/docs/faq.html#unique-doesnt-work
  Event.init().then(() => {
    const event = new Event({
      _id: new mongoose.Types.ObjectId().toString(),
      creatorId: req.userId,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      location: eventData.location,
      nameOfEvent: eventData.nameOfEvent,
      description: eventData.description,
      eventUrl: eventData.eventUrl,
      minimumTeamSize: eventData.minimumTeamSize,
      maximumTeamSize: eventData.maximumTeamSize,
      eventImage: eventData.eventImage,
    });
    event
      .save()
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send({
          message: "Event validation failed",
        });
      });
  });
};

module.exports = setEvent;
