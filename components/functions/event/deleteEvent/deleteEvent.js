const Event = require("../../../models/Event/Event")
const multer = require("multer")
const fs = require("fs")
const path = require("path")

const deleteEvent= async (req, res) => {
  const id = req.params.Id
  Event.findById(id).then(async (event) => {
      if (!event) {
          return res.status(404).send({
              message: "event not found"
          })
      }

      if (event.creatorId === req.userId) {
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