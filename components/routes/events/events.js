const express = require("express")
const Router = express.Router()
const multer = require("multer")
const path = require("path")

const checkAuth = require("../../middleware/checkAuth/checkAuth")
const getEvents = require("../../functions/event/getEvents/getEvents")
const getEventInfo = require("../../functions/event/getEventInfo/getEventInfo")
const setEvent = require("../../functions/event/setEvent/setEvent")
const updateEvent = require("../../functions/event/updateEvent/updateEvent")
const deleteEvent = require("../../functions/event/deleteEvent/deleteEvent")
const fileStorage = require("../../functions/upload/fileStorage/fileStorage")
const fileUpload = require("../../functions/upload/fileUpload/fileUpload")
const fileFilter = require("../../functions/upload/fileFilter/fileFilter")


Router.get('/getevents/:pageNo', getEvents)
Router.get("/geteventinfo/:eventId", getEventInfo)
Router.post("/setevent", checkAuth, fileUpload.single('eventImage'),setEvent)
Router.patch('/updateevent/:eventId', checkAuth, fileUpload.single("eventImage"),updateEvent)
Router.delete('/deleteevent/:eventId', checkAuth,deleteEvent)

module.exports = Router