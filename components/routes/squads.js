const Router = require("express").Router()

const setSquad = require("../functions/squad/setSquad/setSquad")
const getSquadInfo = require("../functions/squad/getSquadInfo/getSquadInfo")

Router.post("/setsquad",setSquad)
Router.get("/getsquadinfo/:squadId",getSquadInfo)
Router.post("/sendsquadinvite",sendSquadInvite)
Router.post("/cancelsquadinvite",cancelSquadInvite)
Router.post("/removesquadmember",removeSquadMember)
Router.post("/deletesquad/:squadId")
module.exports = Router