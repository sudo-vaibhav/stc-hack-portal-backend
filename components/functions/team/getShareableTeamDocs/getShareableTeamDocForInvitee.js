const getShareableTeamDocForInvitee = (doc) => {
    const {
        _id,
        creatorId,
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
        nameOfEvent,
        creatorInfo
    }

}

module.exports = getShareableTeamDocForInvitee