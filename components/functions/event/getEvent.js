const Event = require("../../models/Event")

const processEventQuery = (event) => {
        if (event) {
                return {
                        status: 200,
                        payload: event
                }
        } else {
                return {
                        status: 404,
                        payload: {
                                message: "Event not found"
                        }
                }
        }
}

const getEvent= async (eventIdentifier, searchParameter) => {
        //searchBy stores whether querying will be done 
        //by id
        let event = undefined
        try {
                switch (searchParameter) {
        
                        case "byId":
                                team = await Event.findOne({
                                        _id: eventIdentifier
                                })
                                return processEventQuery(event)

                        default:
                                // if no proper search parameter is given
                                // search will be done by id
                                event = await Event.findOne({
                                        _id: eventIdentifier
                                })
                                return processEventQuery(event)
                }
        } catch (err) {
                return {
                        status: 500,
                        payload: {
                                message: "Internal server error"
                        }
                }
        }
}

module.exports = getEvent