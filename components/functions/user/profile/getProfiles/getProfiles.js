const PER_PAGE_LIMIT = 10
const User = require("../../../../models/User/User")
const getPaginatedData = require("../../../../pagination/getPaginatedData")
const getShareableUserDocs = require("../../getShareableUserDocs/getShareableUserDocs")
const getProfiles = async (req, res) => {
    const pageNo = parseInt(req.params.pageNo)
    documents = await getPaginatedData(User, pageNo, PER_PAGE_LIMIT)

    return res.status(200).send(getShareableUserDocs(documents))
}
module.exports = getProfiles