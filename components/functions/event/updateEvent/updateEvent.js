const Event = require("../../../models/Event")
const multer = require("multer")


const updateEvent = function (req, res) {

  if (req.file) {
      var dataRecords = {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          location: req.body.location,
          description: req.body.description,
          eventUrl: req.body.eventUrl,
          minimumTeamSize: req.body.minimumTeamSize,
          maximumTeamSize: req.body.maximumTeamSize,
          eventImage: "https://hackportal.herokuapp.com/eventImage/" + req.file.filename
      }
  } else {

      var dataRecords = {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          location: req.body.location,
          description: req.body.description,
          eventUrl: req.body.eventUrl,
          minimumTeamSize: req.body.minimumTeamSize,
          maximumTeamSize: req.body.maximumTeamSize
      }
  }

  const id = req.params.Id
  delete req.body._id, req.body.creatorId

  var update = Event.findOneAndUpdate({
      _id: id
  }, dataRecords, {
      omitUndefined: true
  })
  update.exec().then(event => {
      return res.status(200).send({
          message: "Event has been updated"
      })
  }).catch(err => {
      return res.status(500).send({
          message: "Internal Server Error"
      })
  })
}

module.exports = updateEvent