const express = require("express");
const Router = express.Router();

const checkAuth = require("../../middleware/checkAuth/checkAuth");
const getEvents = require("../../functions/event/getEvents/getEvents");
const getEventInfo = require("../../functions/event/getEventInfo/getEventInfo");
const setEvent = require("../../functions/event/setEvent/setEvent");
const updateEvent = require("../../functions/event/updateEvent/updateEvent");
const deleteEvent = require("../../functions/event/deleteEvent/deleteEvent");

Router.get("/getevents/:pageNo", getEvents);
Router.get("/geteventinfo/:eventId", checkAuth, getEventInfo);
Router.post("/setevent", checkAuth, setEvent);
Router.patch("/updateevent/:eventId", checkAuth, updateEvent);
Router.delete("/deleteevent/:eventId", checkAuth, deleteEvent);

module.exports = Router;
