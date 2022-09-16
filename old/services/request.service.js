const { Request } = require('../db')

const findAll = () => {
  return Request.query().execute()
}

const addRequest = (user_id, type, detail, range) => {
  return Request.query().insert({
    user_id: user_id,
    type: type,
    detail: detail,
    range: range,
    state: 0
  })
}

const deleteRequestById = async (id) => {
  return Request.query().delete().where('id', '=', id).first()
}

const updateRequest = async (id, userId, type, detail, range, state) => {
  return await Request.query().patch({
    user_id: userId,
    type: type,
    detail: detail,
    range: range,
    state: state
  }).skipUndefined()
    .where('id', id)
}

module.exports = {
  findAll,
  addRequest,
  deleteRequestById,
  updateRequest
}
