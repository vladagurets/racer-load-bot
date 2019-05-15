async function getDocs (model, collection, docs) {
  const $docs = model.query(collection, {_id: {$in: docs.map(doc => doc.id)}})
  await model.fetchAsync($docs)
  const docs = $docs.get()
  await model.unfetchAsync($docs)
  return docs
}

async function createDocs (model, collection) {
 
}

async function updateDocs (model, collection, docs) {

}

async function removeDocs (model, collection, docs) {

}

function rnd (max) {
  return Math.floor(Math.random() * max) + 1  
}

module.exports = {
  getDocs
}