const getShareableUserDocs = (docs) => {
    const shareableDocs = []
    docs.forEach(doc => {
        const shareableDoc = {
            ...doc
        } //makes a deep copy instead of assigning pointer to original object 

        //delete confidential user information
        delete shareableDoc["__v"],shareableDoc["teams"],shareableDoc["invites"],shareableDoc["squads"],shareableDoc["squadInvites"]
        shareableDocs.push(shareableDoc)
    })

    return shareableDocs
}

module.exports = getShareableUserDocs