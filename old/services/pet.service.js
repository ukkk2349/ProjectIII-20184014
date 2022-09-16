const { Pet } = require('../db')

const findAll = () => {
  return Pet.query().execute()
}

const find = (id) => {
  return Pet.query().findById(id)
}

const findByPetName = (name) => {
  return Pet.query()
    .select('*')
    .skipUndefined()
    .where('name', '=', name)
    .first()
}

const searchPetByName = (name) => {
  return Pet.query()
    .select('*')
    .skipUndefined()
    .where('name', 'like', `%${name}%`)
}

const updatePet = async (id, name, weight, species, description, price, state, sale, images, stock) => {
  await Pet.query()
    .patch({
      name: name,
      weight: weight,
      species: species,
      description: description,
      price: price,
      state: state,
      sale: sale,
      images: images,
      stock: stock
    })
    .skipUndefined()
    .where('id', id)
}

const deletePet = async (id) => {
  await Pet.query().delete().where('id', '=', id)
}

const addPet = (name, weight, species, description, price, state, sale, images, stock) => {
  return Pet.query().insert({
    name: name,
    weight: weight,
    species: species,
    description: description,
    price: price,
    state: state,
    sale: sale,
    images: images,
    stock: stock
  })
}

module.exports = {
  findAll,
  find,
  findByPetName,
  searchPetByName,
  updatePet,
  deletePet,
  addPet
}
