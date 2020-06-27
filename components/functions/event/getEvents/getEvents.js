const Event = require('../../../models/Event');
const getEvents = (req, res, next) => {
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
}

module.exports = getEvents