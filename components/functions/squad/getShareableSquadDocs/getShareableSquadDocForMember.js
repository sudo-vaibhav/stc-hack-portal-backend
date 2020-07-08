const getShareableSquadDocForMember = (doc) => {
  const {
    _id,
    creatorId,
    members,
    squadName,
    description,
    skillsRequired,
    creatorInfo,
  } = doc;

  return {
    _id,
    creatorId,
    squadName,
    description,
    skillsRequired,
    members,
    creatorInfo,
  };
};

module.exports = getShareableSquadDocForMember;
