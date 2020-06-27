const getShareableSquadDocForMember = doc => {
    const {
        _id,
        creatorId,
        members,
        squadName,
        eventId,
        description,
        skillsRequired
    } = doc

    return {
        _id,
        creatorId,
        squadName,
        eventId,
        description,
        skillsRequired,
        members
    }
}

module.exports = getShareableSquadDocForMember