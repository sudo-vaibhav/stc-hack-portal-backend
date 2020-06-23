const PER_PAGE_LIMIT = 10
const getPaginatedData = require("../../../pagination/getPaginatedData")
const User = require("../../../models/User")
const getShareableUserDocs = require("../getShareableUserDocs/getShareableUserDocs")
const searchProfiles = async (req, res) => {
    const {
        skills
    } = req.body
    const pageNo = parseInt(req.params.pageNo)
    const docs = await getPaginatedData(User, pageNo, PER_PAGE_LIMIT, {
        skills: {
            $elemMatch: {
                $in: skills.map(skill => skill.toLowerCase().trim())
            }
        }
    })
    return res.status(200).send(getShareableUserDocs(docs))
}

module.exports = searchProfiles