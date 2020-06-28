const getShareableEventDocs = (docs) => {
  const shareableEventDocs = []
  docs.forEach(doc => {
      const shareableDoc = {
          ...doc
      } //makes a deep copy instead of assigning pointer to original object 
      delete shareableDoc["__v"]
      shareableEventDocs.push(shareableDoc)
  })
  return shareableEventDocs
}

module.exports = getShareableEventDocs