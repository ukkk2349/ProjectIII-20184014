const db = require('./db')
const connection = db.getConnection()

const idExists = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE id = ?', id, (e, results, fields) => {
      if (e) {
        reject(e)
      } else {
        resolve(results.length > 0)
      }
    })
  })
}

const findAll = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users', (e, results, fileds) => {
      if (e) {
        reject(e)
      } else {
        resolve(results)
      }
    })
  })
}

const findOne = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE id = ?', id, (e, result, fields) => {
      if (e) {
        reject(e)
      } else {
        resolve(result)
      }
    })
  })
}

const findByUsername = (username) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE username = ?', username, (e, result, fields) => {
      if (e) {
        reject(e)
      } else {
        resolve(result[0])
      }
    })
  })
}

const addOne = (username, password, email, fullname, position, admin) => {
  let user = {
    username: username,
    password: password,
    email: email,
    fullname: fullname,
    position: position,
    admin: admin,
  }

  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', user, (e, result, fields) => {
      if (e) {
        console.info(e)
        reject(e)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  findAll,
  findOne,
  idExists,
  findByUsername,
  addOne,
}