const Router = require("express").Router()

const setSquad = require("../functions/squad/setSquad/setSquad")
const getSquadInfo = require("../functions/squad/getSquadInfo/getSquadInfo")
const checkAuth = require("../middleware/checkAuth/checkAuth")
const cancelSquadInvite = require("../functions/squad/cancelSquadInvite/cancelSquadInvite")
const removeSquadMember = require("../functions/squad/removeSquadMember/removeSquadMember")
const deleteSquad = require("../functions/squad/deleteSquad/deleteSquad")
const updateSquad = require("../functions/squad/updateSquad/updateSquad")
const sendSquadInvite = require('../functions/squad/sendSquadInvite/sendSquadInvite')


Router.post("/setsquad", checkAuth, setSquad)
Router.get("/getsquadinfo/:squadId", checkAuth, getSquadInfo)
Router.post("/sendsquadinvite", checkAuth, sendSquadInvite)
Router.post("/cancelsquadinvite", checkAuth, cancelSquadInvite)
Router.post("/removesquadmember", checkAuth, removeSquadMember)
Router.post("/deletesquad/:squadId", checkAuth, deleteSquad)
Router.patch("/updatesquad/:squadId",checkAuth, updateSquad)
module.exports = Router