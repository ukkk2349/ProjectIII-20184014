const { Cart } = require('../db')

const find = (id) => {
  return Cart.query().findById(id)
}

const findByProductId = (userId, productId) => {
  return Cart.query().select('*').skipUndefined().where({
    user_id: userId,
    product_id: productId
  }).first()
}

const findByUserId = (userId) => {
  return Cart.query().select('*').skipUndefined().where('user_id', '=', userId)
}

const addProduct = async (userId, productId, infomation, quantity, state) => {
  const res = await Cart.query().insert({
    user_id: userId,
    product_id: productId,
    product_infomation: infomation,
    quantity: quantity,
    state: state
  })
  console.log(res)
}

const updateProduct = async (id, userId, productId, productInfomation, quantity, state) => {
  const res = await Cart.query().patch({
    user_id: userId,
    product_id: productId,
    product_infomation: productInfomation,
    quantity: quantity,
    state: state
  }).skipUndefined()
    .where('id', '=', id)
  console.log(res)
}

const deleteProduct = async (id) => {
  await Cart.query().delete().where('id', '=', id)
}

const deleteBoughtProducts = async (userId) => {
  await Cart.query().delete().where('user_id', '=', userId)
}

module.exports = {
  find,
  findByProductId,
  findByUserId,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteBoughtProducts
}
