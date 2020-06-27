const getShareableSquadDocForInvitee = (doc) =>{
    const {
        _id,
        creatorId,
        squadName,
        description,
        skillsRequired,
        creatorInfo
    } = doc
    
    return {
        _id,
        creatorId,
        squadName,
        description,
        skillsRequired,
        creatorInfo
    }
}

module.exports = getShareableSquadDocForInvitee