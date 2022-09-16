const { Sale } = require('../db')

const findAll = () => {
  return Sale.query().execute()
}

const findByUserName = async (username) => {
  return await Sale.query().select('*').skipUndefined().where('username', '=', username)
}

const findByUserId = async (userId) => {
  return await Sale.query().select('*').skipUndefined().where('user_id', '=', userId)
}

const add = async (userId, username, list, total) => {
  const res = await Sale.query().insert({
    user_id: userId,
    username: username,
    list: list,
    total: total
  })
}

module.exports = {
  findAll,
  findByUserName,
  findByUserId,
  add
}
