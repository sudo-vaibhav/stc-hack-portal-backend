const Event = require("../../../models/Event/Event")
const mongoose = require("mongoose")
const multer = require("multer")
const fileUpload = require("../../upload/fileUpload/fileUpload")
const fileStorage= require("../../upload/fileStorage/fileStorage")
const fileFilter = require("../../upload/fileFilter/fileFilter")
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput")
const setEvent= async (req, res) => {
  console.log(req.file)
  const {
      endDate,
      startDate,
      location,
      nameOfEvent,
      description,
      eventUrl,
      minimumTeamSize,
      maximumTeamSize
  } = req.body
  const eventData = cleanUserSuppliedInput({
    endDate,
    startDate,
    location,
    nameOfEvent,
    description,
    eventUrl,
    minimumTeamSize,
    maximumTeamSize
  })
  //we need to initialize the model because without it,
  //mongoose won't ensure that event name is unique even 
  //after you tell it that unique:true  in Event schema 😕
  //read more about it here: https://mongoosejs.com/docs/faq.html#unique-doesnt-work
  Event.init().then(() => {
    let event = undefined
    if(req.file)
    {
       event = new Event({
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
          eventImage: "https://hackportal.herokuapp.com/eventImage/" + req.file.filename
      })}
      else 
      {
        return res.status(404).send({
          message: "Image not provided or not allowed due to format/size issues"
        })
      }
      event
          .save()
          .then(result => {
              return res.status(200).send(result)
          })
          .catch(err => {
              return res.status(400).send({
                  message: "Duplicate event name, choose another name."
              })
          })

  })
}

module.exports = setEvent