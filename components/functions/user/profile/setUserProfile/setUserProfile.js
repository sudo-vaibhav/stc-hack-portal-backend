const getUser = require("../getUser/getUser")
const User = require("../../../../models/User/User")
const cleanUserSuppliedInput = require("../../../cleanUserSuppliedInput/cleanUserSuppliedInput")

const setProfile = async (req, res) => {
    // extracting all the data provided about user in request body
    const {
        bio,
        name,
        skills,
        college,
        expectedGraduation,
        githubLink,
        stackOverflowLink,
        externalLink
    } = cleanUserSuppliedInput(req.body)

    // constructing user json object from the data for use in mongoDB document
    // by default skills will be converted to lowercase to ensure ease in searching
    // profiles by skill later
    const userData = {
        _id: req.userId,
        name: name.trim(),
        email: req.email,
        college: college.trim(),
        expectedGraduation: expectedGraduation || "",
        bio: bio.trim(),
        skills: skills || [],
        githubLink: githubLink.trim() || "",
        stackOverflowLink: stackOverflowLink.trim() || "",
        externalLink: externalLink.trim() || "",
        squadInvites: [],
        teamInvites : [],
        squads : [],
        teams : []
    }

    const queryResponse = await getUser(req.userId, "byId")

    //if server error occured
    if (queryResponse.status == 200) {
        return res.status(400).send({
            message : "User already exists, try updating the profile or check your input details!"
        })
    } else {
            const user = new User(userData)
            const newUser = await user.save()
            return res.status(200).send(newUser)
    }
}

module.exports = setProfile