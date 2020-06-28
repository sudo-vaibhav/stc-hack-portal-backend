const getShareableEventDocs = (docs) => {
  const shareableDocs = []
  docs.forEach(doc => {
      const shareableDoc = {
          ...doc
      } //makes a deep copy instead of assigning pointer to original object 
      delete shareableDoc["__v"]
      shareableDocs.push(shareableDoc)
  })
  return shareableDocs
}

module.exports = getShareableEventDocs