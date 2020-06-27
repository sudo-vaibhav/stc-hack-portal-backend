const mongoose = require("mongoose")
const Team = require("../models/Team")
const User = require("../models/User")
const deleteTeam = require("../functions/team/deleteTeam/deleteTeam")

const EventSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    nameOfEvent: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    eventUrl: {
        type: String
    },
    minimumTeamSize: {
        type: Number,
        required: true
    },
    maximumTeamSize: {
        type: Number,
        required: true
    },
    eventImage: {
      type: String
    }
},{
  id: false
}) //setting id to false prevents extra unneccessary id appearing when converting object to json)

EventSchema.virtual("teams", {
  ref: "Team",
  localField: "_id",
  foreignField: "eventId",
})


//delete event teams and user teams and invites when the event is removed

// EventSchema.post('remove', { document: true},  function(res,next) {
//   const event = this
//   console.log(event)
//   Team.remove({eventId: event._id}).then(() => {
//     console.log("Event " + event._id + " teams deleted")
//     next()
//   }).catch((err) => {
//     console.log("Event " + event._id + " Teams not deleted")
//     return res.status(500).send({
//       error: "error in middleware"
//     })
//   })
// })

EventSchema.post("remove",(event)=>{
    const eventId = event._id
    Team.find({eventId})
    .then(async (teams, err) => {
        if(err){
            console.log("error in post event removal")
        }
        else{
            const teamRemovesToAwait = teams.map(team=>{
                return team.remove()
            })
            await Promise.all(teamRemovesToAwait)
            console.log("all teams of the event have been removed")
        }
    })
})



EventSchema.virtual("creator", {
    ref: "User",
    localField: "creatorId",
    foreignField: "_id",
    justOne: true
})


module.exports = mongoose.model("Event", EventSchema)