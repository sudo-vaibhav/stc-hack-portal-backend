const Event = require("../../../models/Event/Event")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const fileUpload = require("../../upload/fileUpload/fileUpload")
const fileLimit = require("../../upload/fileFilter/fileFilter")
const fileStorage = require("../../upload/fileStorage/fileStorage")



const deleteEvent= async (req,res) => {
  const id = req.params.eventId
  Event.findById(id).then(async (event) => {
      if (!event) {
          return res.status(404).send({
              message: "event not found"
          })
      }

      if (event.creatorId === req.userId) {
        fs.unlink("public\\uploads\\eventUpload\\"+event.eventImage.substr(44, ),(err) => {
          if(err){
            return res.status(404).send({
              message: "File Not deleted"
            })
          }
         })
          await event.remove()
          return res.status(200).send({
              message: "Event deleted Successfully"
          })
      } else {
          return res.status(400).send({
              message: "You don't have the required privileges to delete this event"
          })
      }
  })
}

module.exports = deleteEvent