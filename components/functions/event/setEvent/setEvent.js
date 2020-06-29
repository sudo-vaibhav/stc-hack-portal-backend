const Event = require("../../../models/Event/Event")
const mongoose = require("mongoose")
const multer = require("multer")
const fileUpload = require("../../upload/fileUpload/fileUpload")
const fileStorage= require("../../upload/fileStorage/fileStorage")
const fileFilter = require("../../upload/fileFilter/fileFilter")

const setEvent= async (req, res) => {
  console.log(req.file)
  const {
      startDate,
      endDate,
      location,
      nameOfEvent,
      description,
      eventUrl,
      minimumTeamSize,
      maximumTeamSize,
  } = req.body
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
          startDate: startDate,
          endDate: endDate,
          location: location,
          nameOfEvent: nameOfEvent,
          description: description,
          eventUrl: eventUrl,
          minimumTeamSize: minimumTeamSize,
          maximumTeamSize: maximumTeamSize,
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