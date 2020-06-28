const getShareableTeamDocForMember = doc => {
    const {
        _id,
        creatorId,
        members,
        teamName,
        eventId,
        description,
        skillsRequired,
        nameOfEvent,
        creatorInfo
    } = doc

    return {
        _id,
        creatorId,
        teamName,
        eventId,
        description,
        skillsRequired,
        members,
        nameOfEvent,
        creatorInfo
    }
}

module.exports = getShareableTeamDocForMember