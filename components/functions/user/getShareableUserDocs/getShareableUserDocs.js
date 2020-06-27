const getShareableUserDocs = (docs) => {
    const shareableDocs = []
    docs.forEach(doc => {
        const shareableDoc = {
            ...doc
        } //makes a deep copy instead of assigning pointer to original object 

        //delete confidential user information
        delete shareableDoc["__v"]
        delete shareableDoc["teams"]
        delete shareableDoc["invites"]
        delete shareableDoc["squads"]
        delete shareableDoc["squadInvites"]
        shareableDocs.push(shareableDoc)
    })

    console.log("shareable docs",shareableDocs)
    return shareableDocs
}

module.exports = getShareableUserDocs