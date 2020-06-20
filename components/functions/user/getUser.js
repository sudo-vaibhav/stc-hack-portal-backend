const User = require("../../models/User")

const processUserQuery = (user) => {
    if (user) {
        console.log(user)
        return {
            status: 200,
            payload: user
        }
    } else {
        return {
            status: 404,
            payload: {
                message: "User doesn't exist. Did user complete his/her profile yet?"
            }
        }
    }
}

const getUser = async (userIdentifier, searchParameter = "byId") => {
    //searchBy stores whether querying will be done by
    //email or userId
    let user = undefined
    try {
        switch (searchParameter) {
            case "byEmail":
                user = await User.findOne({
                    email: userIdentifier
                })
                return processUserQuery(user)
            case "byId":
                user = await User.findOne({
                    _id: userIdentifier
                })
                return processUserQuery(user)

            default:
                // if no proper search parameter is given
                // search will be done by id
                user = await User.findOne({
                    _id: userIdentifier
                })
                return processUserQuery(user)
        }
    } catch (err) {
        return {
            status: 500,
            payload: {
                message: err.message
            }
        }
    }
}

module.exports = getUser