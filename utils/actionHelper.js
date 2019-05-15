
async function createDocs (model, collection) {
  // create your custom docs
}

async function getDocs (model, collection) {
  const $docs = model.query(collection, {$limit: rnd(100)})
  await model.fetchAsync($docs)
  const docs = $docs.get()
  await model.unfetchAsync($docs)
  return docs
}

async function updateDocs (model, collection, docs) {
  // update your custom docs
}

async function removeDocs (model, collection, docs) {
  // rm your custom docs
}

function rnd (max) {
  return Math.floor(Math.random() * max) + 1  
}

module.exports = {
  createDocs,
  getDocs,
  updateDocs,
  removeDocs,
  rnd
}