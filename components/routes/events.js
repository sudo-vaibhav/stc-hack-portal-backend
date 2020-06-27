const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")
const Event = require('../models/Event');

const checkAuth = require("../middleware/checkAuth")
const getEvents = require("../functions/event/getEvents/getEvents")
const getEventInfo = require("../functions/event/getEventInfo/getEventInfo")

// to view all events
Router.get('/getevents', getEvents)
//to view specific event(id)
Router.get("/geteventinfo/:teamId", getEventInfo)

//storage mechanism for multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/eventUpload')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

//to filter files according to mimetype
const fileFilter = (req, file, cb) => {
    //criteria to accept a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb("wrong image format", false)
    }
}

//main event upload function
const fileUpload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1024 * 1024 * 6 // maximum 6MB file size
    },
    fileFilter: fileFilter
})


//to add info about specific event(id) 
Router.post("/setevent", checkAuth, fileUpload.single('eventImage'), async (req, res) => {
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
        const event = new Event({
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
        });
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
})




//to update a specific event
Router.post('/updateevent/:Id', checkAuth, fileUpload.single("eventImage"), function (req, res) {

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
})



//to remove specific event(id)
Router.delete('/deleteevent/:Id', checkAuth, async (req, res) => {
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
})

module.exports = Router