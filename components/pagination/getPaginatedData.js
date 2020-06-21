const getPaginatedData = (Model, pageNumber, perPageLimit, queryConditions = {}) => {
    return Model.find(queryConditions)
        .limit(perPageLimit)
        .skip((pageNumber - 1) * perPageLimit)
        .lean()
}

module.exports = getPaginatedData