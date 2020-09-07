module.exports = (doc) => {
  if (doc.minimumTeamSize > doc.maximumTeamSize) {
    throw new Error(
      "minimum team size should be less that or equal to maximum team size"
    );
  }
};
