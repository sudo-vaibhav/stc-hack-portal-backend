const getShareableSquadDocForInvitee = (doc) =>{
    const {
        _id,
        creatorId,
        squadName,
        description,
        skillsRequired,
        createrInfo
    } = doc
    
    return {
        _id,
        creatorId,
        squadName,
        description,
        skillsRequired,
        createrInfo
    }
}

module.exports = getShareableSquadDocForInvitee