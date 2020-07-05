// this function takes in an array of user docs in json and
//gives them back after removing sensitive information for being
//shared with other users

const getShareableUserDocs = (docs) => {
  const shareableDocs = [];
  docs.forEach((doc) => {
    const shareableDoc = {
      ...doc,
    }; //makes a deep copy instead of assigning pointer to original object

    //delete confidential user information
    delete shareableDoc["__v"];
    delete shareableDoc["teams"];
    delete shareableDoc["teamInvites"];
    delete shareableDoc["squads"];
    delete shareableDoc["squadInvites"];
    shareableDocs.push(shareableDoc);
  });
  return shareableDocs;
};

module.exports = getShareableUserDocs;
