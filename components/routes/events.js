const express = require("express")
const Router = express.Router();
const mongoose = require("mongoose")
const multer = require("multer")
const path= require("path")
const Event = require('../models/Event')

const getEvent = require("../functions/event/getEvent")
const deleteTeam = require("../functions/team/deleteTeam/deleteTeam")
const checkAuth = require("../middleware/checkAuth");




//storage mechanism for multer
const fileStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'./components/functions/event/eventUpload')
  },
  filename: (req,file,cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

//to filter files according to mimetype
const fileFilter = (req,file,cb) => {
  //criteria to accept a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
  { 
    cb(null,true)
  }else
  {
    cb("wrong image format",false)
  }
}

//main event upload function
const fileUpload = multer({storage:fileStorage,
limits:{
  fileSize: 1024 * 1024 * 6 // maximum 6MB file size
},fileFilter: fileFilter})


// to view all events
Router.get('/getevents', (req, res, next) => {
    Event.find()
        .select('-__v')
        .exec()
        .then(docs => {
            return res.status(200).send(docs)
        })
        .catch(err => {
            return res.status(500).send({
                error: "Internal Server Error"
            })
        })
})


//to view specific event(id)
Router.get("/aboutevent/:Id", (req, res) => {
    const id = req.params.Id
    Event.findById(id)
        .populate("creator","name email")
        .exec((err,doc) => {
            if (doc) {
                return res.status(200).send(doc.toJSON({virtuals: true}))
            } else {
                return res.status(404).send({
                    message: "No Data Found!"
                })
            }
        })
})


//to add info about specific event(id) 
Router.post("/setevent", checkAuth,fileUpload.single('eventImage'),async (req, res) => {
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
                eventImage: req.file.filename
            });
            event
                .save()
                .then(result => {
                    return res.status(201).send(result)
                })
                .catch(err => {
                    return res.status(400).send({
                        message: "Duplicate event name, choose another name."
                    })
                })

        }) 
})

//to update a specific event
Router.post("/updateevent/:Id", checkAuth, fileUpload.single("eventImage"), (req, res, next) => {
    const id = req.params.Id
    delete req.body._id, req.body.creatorId
    Event.update({
            _id: id
        },req.body)
        .exec()
        .then(result => {
            res.status(200).send({
                message: "Event has been updated",
            })
        })
        .catch(err => {
            res.status(500).send({
                error: "Internal Server Error"
            })
        })
})



//to remove specific event(id)




module.exports = Router