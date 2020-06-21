const getShareableUserDocs = (docs) => {
    const shareableDocs = []
    docs.forEach(async (doc) => {
        const shareableDoc = {
            ...doc
        } //makes a deep copy instead of assigning pointer to original object 

        delete shareableDoc["__v"]
        delete shareableDoc["teams"]
        delete shareableDoc["invites"]
        shareableDocs.push(shareableDoc)
    })

    return shareableDocs
}

module.exports = getShareableUserDocs