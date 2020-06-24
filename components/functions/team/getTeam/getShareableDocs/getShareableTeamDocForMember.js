const getShareableTeamDocForMember = doc => {
    const {
        _id,
        creatorId,
        members,
        teamName,
        eventId,
        description,
        skillsRequired
    } = doc

    return {
        _id,
        creatorId,
        teamName,
        eventId,
        description,
        skillsRequired,
        members
    }
}

module.exports = getShareableTeamDocForMember