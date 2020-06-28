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
        externalLink: externalLink || ""
    }

    const queryResponse = await getUser(req.userId, "byId")

    //if server error occured
    if (queryResponse.status == 500) {
        return res.status(queryResponse.status).send(queryResponse.payload)
    } else {
        //if user is already created previously
        if (queryResponse.status == 200) {
            const user = queryResponse.payload
            user.overwrite(userData)
            const updatedUser = await user.save()
            return res.status(200).send(updatedUser)
        }
        //else if user is new 
        else {
            const user = new User(userData)
            const newUser = await user.save()
            return res.status(200).send(newUser)
        }
    }
}

module.exports = setProfile