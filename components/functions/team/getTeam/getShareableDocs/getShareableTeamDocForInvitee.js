const getShareableTeamDocForInvitee = (doc) => {
    const {
        _id,
        creatorId,
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
        skillsRequired
    }

}

module.exports = getShareableTeamDocForInvitee