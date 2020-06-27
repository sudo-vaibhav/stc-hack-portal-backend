const getShareableTeamDocForInvitee = (doc) => {
    const {
        _id,
        creatorId,
        teamName,
        eventId,
        description,
        skillsRequired,
        nameOfEvent
    } = doc

    return {
        _id,
        creatorId,
        teamName,
        eventId,
        description,
        skillsRequired,
        nameOfEvent
    }

}

module.exports = getShareableTeamDocForInvitee