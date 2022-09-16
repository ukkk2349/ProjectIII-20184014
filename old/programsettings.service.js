const db = require('./db')
const connection = db.getConnection()

const getThemeCode = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT theme FROM programsettings WHERE user_id = ?', id, (e, results, fields) => {
      if (e) {
        reject(e)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = {
  getThemeCode,

}