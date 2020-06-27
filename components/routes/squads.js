const Router = require("express").Router()

const setSquad = require("../functions/squad/setSquad/setSquad")
const getSquadInfo = require("../functions/squad/getSquadInfo/getSquadInfo")
const checkAuth = require("../middleware/checkAuth")
const cancelSquadInvite = require("../functions/squad/cancelSquadInvite/cancelSquadInvite")
const removeSquadMember = require("../functions/squad/removeSquadMember/removeSquadMember")
const deleteSquad = require("../functions/squad/deleteSquad/deleteSquad")

Router.post("/setsquad",checkAuth,setSquad)
Router.get("/getsquadinfo/:squadId",getSquadInfo)
Router.post("/sendsquadinvite", checkAuth, sendSquadInvite)
Router.post("/cancelsquadinvite", checkAuth, cancelSquadInvite)
Router.post("/removesquadmember", checkAuth, removeSquadMember)
Router.post("/deletesquad/:squadId", checkAuth, deleteSquad)
module.exports = Router