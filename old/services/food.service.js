const { Food } = require('../db')

const findAll = () => {
  return Food.query().execute()
}

const find = (id) => {
  return Food.query().findById(id)
}

const findByFoodName = (name) => {
  return Food.query().select('*').skipUndefined().where('name', '=', name).first();
}

const searchFoodByName = (name) => {
  return Food.query()
    .select('*')
    .skipUndefined()
    .where('name', 'like', `%${name}%`)
}

const updateFood = async (id, name, calories, weight, description, price, sale, images, stock) => {
  await Food.query()
    .patch({
      name: name,
      calories: calories,
      weight: weight,
      description: description,
      price: price,
      sale: sale,
      images: images,
      stock: stock
    })
    .where('id', '=', id)
}

const deleteFood = async (id) => {
  await Food.query().delete().where('id', '=', id)
}

const addFood = (name, calories, weight, description, price, sale, images, stock) => {
  return Food.query().insert({
    name: name,
    calories: calories,
    weight: weight,
    description: description,
    price: price,
    sale: sale,
    images: images,
    stock: stock
  })
}

module.exports = {
  findAll,
  find,
  findByFoodName,
  searchFoodByName,
  updateFood,
  deleteFood,
  addFood
}
