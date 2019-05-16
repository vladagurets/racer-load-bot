const {rnd} = require('./mainHelper')

async function createDocs (model, collection) {
  // create your custom docs
  // TODO:
}

async function getDocs (model, collection) {
  const $docs = model.query(collection, {
    $limit: rnd(100),
    // you should to specify skip number based on amount of docs from each collection
    // it'll generate random skip count for query
    $skip: rnd(1000)
  })
  await model.fetchAsync($docs)
  const docs = $docs.get()
  await model.unfetchAsync($docs)
  return docs
}

async function updateDocs (model, collection, docs) {
  // update your custom docs
  // TODO:
}

async function removeDocs (model, collection, docs) {
  // rm your custom docs
  // TODO:
}

module.exports = {
  createDocs,
  getDocs,
  updateDocs,
  removeDocs
}