// const db = require('./db')
// const connection = db.getConnection()

// const idExists = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query('SELECT * FROM users WHERE id = ?', id, (e, results, fields) => {
//       if (e) {
//         reject(e)
//       } else {
//         resolve(results.length > 0)
//       }
//     })
//   })
// }

// const findAll = () => {
//   return new Promise((resolve, reject) => {
//     connection.query('SELECT * FROM users', (e, results, fileds) => {
//       if (e) {
//         reject(e)
//       } else {
//         resolve(results)
//       }
//     })
//   })
// }

// const findOne = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query('SELECT * FROM users WHERE id = ?', id, (e, result, fields) => {
//       if (e) {
//         reject(e)
//       } else {
//         resolve(result)
//       }
//     })
//   })
// }

// const findByUsername = (username) => {
//   return new Promise((resolve, reject) => {
//     connection.query('SELECT * FROM users WHERE username = ?', username, (e, result, fields) => {
//       if (e) {
//         reject(e)
//       } else {
//         resolve(result[0])
//       }
//     })
//   })
// }

// const addOne = (username, password, email, fullname, position, admin) => {
//   let user = {
//     username: username,
//     password: password,
//     email: email,
//     fullname: fullname,
//     position: position,
//     admin: admin,
//   }

//   return new Promise((resolve, reject) => {
//     connection.query('INSERT INTO users SET ?', user, (e, result, fields) => {
//       if (e) {
//         console.info(e)
//         reject(e)
//       } else {
//         resolve(result)
//       }
//     })
//   })
// }

// module.exports = {
//   findAll,
//   findOne,
//   idExists,
//   findByUsername,
//   addOne,
// }

const { User } = require('../db')

const findAll = () => {
  return User.query().execute()
}

const find = (id) => {
  return User.query().findById(id)
}

const findByEmail = (email) => {
  return User.query().select('*').skipUndefined().where('email', '=', email).first();
}

const update = async (id, name, password, date_of_birth, address, phone_number, email, gender, isAdmin, avatar) => {
  await User.query()
    .patch({
      name: name,
      password: password,
      date_of_birth: date_of_birth,
      address: address,
      phone_number: phone_number,
      email: email, gender: gender,
      is_admin: isAdmin,
      avatar: avatar
    })
    .where('id', '=', id)
}

const deleteUser = async (id) => {
  await User.query().delete().where('id', '=', id)
}

const addUser = (name, password, date_of_birth, address, phone_number, gender, email, is_admin) => {
  return User.query().insert({
    name: name,
    password: password,
    date_of_birth: date_of_birth,
    address: address,
    phone_number: phone_number,
    gender: gender,
    email: email,
    is_admin: is_admin
  })
}

module.exports = {
  findAll,
  find,
  findByEmail,
  update,
  deleteUser,
  addUser
}
