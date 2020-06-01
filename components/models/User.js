const mongoose = require("mongoose")


const User = mongoose.model("User", {
        _id : {
                type: String,
                required: true
        },

        bio: {
                type: String
        },
        name: {
                type: String,
                required: true
        },
        skills: [{type: String}],
        college: {type: String},
        teams: [{type: String}],
        
        externalLink: {type: String}
        
})
module.exports = User