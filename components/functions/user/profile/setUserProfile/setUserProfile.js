const getUser = require("../getUser/getUser")
const User = require("../../../../models/User/User")

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
    } = req.body

    // constructing user json object from the data for use in mongoDB document
    // by default skills will be converted to lowercase to ensure ease in searching
    // profiles by skill later
    const userData = {
        _id: req.userId,
        name: name,
        email: req.email,
        college: college,
        expectedGraduation: expectedGraduation || "",
        bio: bio,
        skills: skills.map(skill => skill.toLowerCase().trim()) || [],
        githubLink: githubLink || "",
        stackOverflowLink: stackOverflowLink || "",
        externalLink: externalLink || "",
        squadInvites: [],
        teamInvites : [],
        squads : [],
        teams : []
    }

    const queryResponse = await getUser(req.userId, "byId")

    //if server error occured
    if (queryResponse.status == 200) {
        return res.status(400).send({
            message : "User already exists, try updating the profile instead"
        })
    } else {
            const user = new User(userData)
            const newUser = await user.save()
            return res.status(200).send(newUser)
    }
}

module.exports = setProfile