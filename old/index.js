const express = require('express')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const Busboy = require('busboy')
const bcrypt = require('bcrypt')
const usersService = require('./user.service')
const cors = require('cors')
const programsettings = require('./programsettings.service')

const SECRET_KEY = 'HuckFitler'
const app = express()
app.use(cors())
app.use(express.json())

const PORT = 8080
app.listen(PORT, () => {
  console.info(`Server started: http://localhost:${PORT}`)
})

app.get('/theme', (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader.substring('Bearer '.length)

  if (!token) {
    res.sendStatus(401)
  }

  verifyJwt(token)
    .then(payload => {
      return usersService.findByUsername(payload.username)
    })
    .then(result => {
      return programsettings.getThemeCode(result.id)
    })
    .then(id => {
      res.send(id)
    })
    .catch(e => {
      console.error(e)
      res.sendStatus(500)
    })
})

app.post('/login', (req, res) => {
  const user = req.body

  usersService.findByUsername(user.username)
    .then(result => {
      if (!result) {
        console.info('user not found')
        res.send(404)
        return
      }

      bcrypt.compare(user.password, result.password, function (err, fit) {
        if (fit) {
          const token = jwt.sign({ username: user.username }, SECRET_KEY)
          console.info(token)
          res.send(token)
          return
        }
        console.info('Wrong password!')
        res.sendStatus(401)
      })
    })
    .catch(e => {
      console.error(e)
      res.sendStatus(e.statusCode)
    })
})

app.post('/signup', (req, res) => {
  const body = req.body
  const saltRounds = 10

  usersService.findByUsername(body.username)
    .then(result => {
      if (result) {
        console.info('User name exist!')
        res.send(400)
        return
      }

      return hashPromise(body.password, saltRounds)
    })
    .then(hash => {
      console.info(hash)
      return usersService.addOne(body.username, hash, body.email, body.fullname, body.position, body.admin)
        .then((result) => {
          res.send(200)
          return
        })
    })
    .catch((e) => {
      console.error(e)
      res.send(500)
    })
})

app.head('/auth', (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.sendStatus(401)
    return
  }

  const token = authHeader.substring('Bearer '.length)

  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) {
      console.error(err)
      res.sendStatus(401)
      return
    }
    res.sendStatus(200)
  })
})

app.get('*', (req, res) => {
  res.sendStatus(200)
})

const hashPromise = (password, saltRounds) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (e, hash) {
      if (e) {
        console.error(e)
        reject(e)
      }
      resolve(hash)
    })
  })
}

function verifyJwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
        reject(err)
      } else {
        resolve(payload)
      }
    })
  })
}
