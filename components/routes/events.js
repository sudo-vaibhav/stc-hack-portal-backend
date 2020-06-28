const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")
const Event = require('../models/Event');

const checkAuth = require("../middleware/checkAuth")
const getEvents = require("../functions/event/getEvents/getEvents")
const getEventInfo = require("../functions/event/getEventInfo/getEventInfo")
const setEvent = require("../functions/event/setEvent/setEvent")
const updateEvent = require("../functions/event/updateEvent/updateEvent")
const deleteEvent = require("../functions/event/deleteEvent/deleteEvent")

// to view all events
Router.get('/getevents/:pageNo', getEvents)
//to view specific event(id)
Router.get("/geteventinfo/:eventId", getEventInfo)

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
Router.post("/setevent", checkAuth, fileUpload.single('eventImage'),setEvent)
//to update a specific event
Router.post('/updateevent/:Id', checkAuth, fileUpload.single("eventImage"),updateEvent)
//to remove specific event(id)
Router.delete('/deleteevent/:Id', checkAuth,deleteEvent)

module.exports = Router