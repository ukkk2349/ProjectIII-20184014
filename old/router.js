const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const userService = require('./services/user.service');
const petService = require('./services/pet.service');
const foodService = require('./services/food.service')
const cartService = require('./services/cart.service')
const saleService = require('./services/sale.service')
const requestService = require('./services/request.service')
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ukkk'
var fs = require('fs')

const { User, Pet, Food, Cart, Sale } = require('./db');
const { BIconArrowDownUp } = require('bootstrap-vue');
const { request } = require('express');
const formidable = require('formidable');


router.get('/users', async (req, res) => {
  const users = await userService.findAll()
  res.send(users)
});

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

router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.query().findById(id)
    if (!user) {
      res.sendStatus(404)
      return
    }
    res.send(user)
  } catch (err) {
    res.send(err)
  }

})

router.post('/register', async (req, res) => {
  const body = req.body
  const saltRounds = 10

  const hasUser = await userService.findByEmail(body.email)

  if (hasUser) {
    console.info('This email has been registered!')
    res.sendStatus(400)
    return
  }

  const hash = await hashPromise(body.password, saltRounds)
  const addUser = await userService.addUser(body.name, hash, body.dateOfBirth, body.address, body.phoneNumber, body.gender, body.email, 0)

  const token = jwt.sign({ userId: addUser.id }, SECRET_KEY)
  return res.status(200).json({
    title: 'login successfully',
    token: token,
    user: addUser,
  })

});

router.post('/login', (req, res) => {
  const user = req.body

  userService.findByEmail(user.email)
    .then(result => {
      if (!result) {
        res.send(404)
        return
      }

      bcrypt.compare(user.password, result.password, function (err, fit) {
        if (err) {
          return res.statusCode(401).json({
            title: 'login failed',
            error: 'invalid credentials'
          })
        }
        if (fit) {
          const token = jwt.sign({ userId: user.id }, SECRET_KEY)
          return res.status(200).json({
            title: 'login successfully',
            token: token,
            userId: user.id,
          })
        }
        console.info('wrong password')
        res.sendStatus(401)
      })
    })
    .catch(e => {
      console.error(e.response.data)
      res.sendStatus(e.statusCode)
    })
})

router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id
  const result = await userService.deleteUser(userId)
  res.send(result)
})

router.post('/pet', async (req, res) => {
  const body = req.body
  const hasPet = await petService.findByPetName(body.name)
  if (hasPet) {
    console.info('This pet had been added')
    res.sendStatus(400)
    return
  }

  const addPet = await petService.addPet(
    body.name,
    body.weight,
    body.species,
    body.description,
    body.price,
    body.state,
    body.sale,
    body.images,
    1)
  res.send(addPet)
})

router.post('/food', async (req, res) => {
  const body = req.body
  const hasFood = await foodService.findByFoodName(body.name)
  if (hasFood) {
    console.info('This food had been added')
    res.sendStatus(400)
    return
  }

  const addFood = await foodService.addFood(
    body.name,
    body.calories,
    body.weight,
    body.description,
    body.price,
    body.sale,
    body.images,
    body.stock)
  res.send(addFood)
})

router.get('/pets', async (req, res) => {
  const pets = await petService.findAll()
  res.send(pets)
})

router.get('/pet/find-id/:id', async (req, res) => {
  try {
    const id = req.params.id
    const pet = await Pet.query().findById(id)
    if (!pet) {
      res.sendStatus(404)
      return
    }
    res.send(pet)
  } catch (err) {
    res.send(err)
  }
})

router.get('/pet/find-name/:name', async (req, res) => {
  try {
    const name = req.params.name
    const pet = await petService.findByPetName(name)
    if (!pet) {
      res.sendStatus(404)
      return
    }
    res.send(pet)
  } catch (err) {
    res.send(err)
  }
})
router.get('/pet/search/:name', async (req, res) => {
  try {
    const name = req.params.name
    const pets = await petService.searchPetByName(name)
    if (!pets) {
      res.sendStatus(404)
      return
    }
    res.send(pets)
  } catch (err) {
    res.send(err)
  }
})

router.put('/pet/update', async (req, res) => {
  const pet = req.body
  await petService.updatePet(pet.id, pet.name, pet.weight, pet.species, pet.description, pet.price, pet.state, pet.sale, pet.stock).catch(e => console.error(e))
  res.send(pet)
})

router.get('/foods', async (req, res) => {
  const foods = await foodService.findAll()
  res.send(foods)
})

router.get('/food/find-id/:id', async (req, res) => {
  try {
    const id = req.params.id
    const food = await Food.query().findById(id)
    if (!food) {
      res.sendStatus(404)
      return
    }
    res.send(food)
  } catch (err) {
    res.send(err)
  }
})

router.get('/food/find-name/:name', async (req, res) => {
  try {
    const name = req.params.name
    const food = await foodService.findByFoodName(name)
    if (!food) {
      res.sendStatus(404)
      return
    }
    res.send(food)
  } catch (err) {
    res.send(err)
  }
})

router.get('/food/search/:name', async (req, res) => {
  try {
    const name = req.params.name
    const foods = await foodService.searchFoodByName(name)
    if (!foods) {
      res.sendStatus(404)
      return
    }
    res.send(foods)
  } catch (err) {
    res.send(err)
  }
})

router.put('/food/update', async (req, res) => {
  const food = req.body
  await foodService.updateFood(food.id, food.name, food.calories, food.weight, food.description, food.price, food.sale, food.images, food.stock)
    .catch(e => console.error(e))
  res.send(food)
})

router.delete('/pet/delete/:id', async (req, res) => {
  const response = await petService.deletePet(req.params.id);
  res.send(response)
})

router.delete('/food/delete/:id', async (req, res) => {
  const response = await foodService.deleteFood(req.params.id);
  res.send(response)
})

router.put('/pet/buy', async (req, res) => {
  const petId = req.body.id
  const pet = petService.find(petId)

  await petService.updatePet(petId, pet.name, pet.weight, pet.species, pet.description, pet.price, pet.state, pet.sale, pet.images, 0)
})

router.put('/food/buy', async (req, res) => {
  const foodId = req.body.id
  const food = petService.find(foodId)

  await foodService.updateFood(foodId, food.name, food.calories, food.weight, food.description, food.price, food.sale, food.images, food.stock - 1)
})

router.get('/cart/:id', async (req, res) => {
  const userId = req.params.id
  const products = await cartService.findByUserId(userId)
  res.send(products)
})

router.post('/add-to-cart/', async (req, res) => {
  const body = req.body
  const hasProduct = await cartService.findByProductId(body.userId, body.productId)
  var quantity = body.quantity;

  if (hasProduct) {
    if(hasProduct.productId < 100) {
      hasProduct.quantity++;
      quantity++;
    }
    await cartService.updateProduct(hasProduct.id, hasProduct.userId, hasProduct.productId, hasProduct.infomation, hasProduct.quantity, 0)
      .catch(e => console.error(e))
    res.send(hasProduct)
    return
  }
  else
  {
    const addToCart = await cartService.addProduct(body.userId, body.productId, body.infomation, body.quantity, 0);
    quantity++;
    res.send(addToCart);
  }
})

router.delete('/cart/buy-cart/:userId', async (req, res) => {
  const response = await cartService.deleteBoughtProducts(req.params.userId);
  res.send(response)
})

router.post('/cart/buy-cart', async (req, res) => {
  const body = req.body
  const response = await saleService.add(body.userId, body.username, body.list, body.total)
  res.send(response)
})

router.delete('/cart/delete/:id', async (req, res) => {
  const id = req.params.id
  const response = await cartService.deleteProduct(id)
  res.send(response)
})

router.put('/cart/product/minus', async (req, res) => {
  const id = req.body.id
  const product = await cartService.find(id)

  const quantity = product.quantity - 1
  const result = await cartService.updateProduct(id, product.user_id, product.product_id, product.product_infomation, quantity, product.state)
  res.send(result)
})

router.put('/cart/product/plus', async (req, res) => {
  const id = req.body.id
  const product = await cartService.find(id)

  const quantity = product.quantity + 1
  const result = await cartService.updateProduct(id, product.user_id, product.product_id, product.product_infomation, quantity, product.state)
  res.send(result)
})

router.get('/sales', async (req, res) => {
  const response = await saleService.findAll()
  res.send(response)
})

router.get('/sale/:userId', async (req, res) => {
  const result = await saleService.findByUserId(req.params.userId)
  res.send(result)
})

router.get('/requests', async (req, res) => {
  const response = await requestService.findAll()
  res.send(response)
})

router.post('/request', async (req, res) => {
  const body = req.body
  const response = await requestService.addRequest(body.userId, body.type, body.detail, body.range)
  res.send(response)
})

router.delete('/request/delete/:id', async (req, res) => {
  const id = req.params.id
  const addRequest = await requestService.deleteRequestById(id)
  res.send(addRequest)
})

router.put('/request/update', async (req, res) => {
  const request = req.body
  await requestService.updateRequest(request.id, request.userId, request.type, request.detail, request.range, request.state)
  res.send(request)
})

router.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm()
  form.multiples = true

  form.on('field', function (field, value) {
    fields.push([field, value]);
    console.log(field)
  })
  form.on('file', function (field, file) {
    var oldpath = file.path;
    var newpath = './src/assets/' + file.name;
    // fs.copyFile(oldpath, newpath, function (err) {
    //   if (err) throw err;
    // })
    var rawData = fs.readFileSync(oldpath)
    fs.writeFile(newpath, rawData, function(err){
      if(err) console.log(err)
      return res.status(200)
  })
    fs.unlink(oldpath, (err) => {
      if (err) throw err;
    });
  })
  form.on('end', function () {
    console.log('done');
  })

  form.parse(req)

  // form.parse(req, function (err, fields, files) {
  //     console.log(files.filetoupload.length)
  //     var oldpath = files.filetoupload.path;
  //   var newpath = './src/assets/' + files.filetoupload.name;
  //   console.log(oldpath)
  //   fs.copyFile(oldpath, newpath, function(err)  {
  //     if (err) throw err;
  //   })
  //   fs.unlink(oldpath, (err) => {
  //     if (err) throw err;
  //   });
  // })
  res.sendStatus(200)
})

router.put('/change-password', async (req, res) => {
  const info = req.body
  const saltRounds = 10
  const user = await User.query().findById(info.userId)
  bcrypt.compare(info.oldPassword, user.password, async function(err, fit) {
    if(err) {
      return res.status(401).json({
        title: 'wrong password',
        error: 'invalid credentials'
      })
    }
    if(fit) {
      const hash = await hashPromise(info.newPassword, saltRounds)
      const changePass = await userService.update(info.userId, user.name, hash, user.date_of_birth, user.address, user.phone_number, user.email, user.gender, user.is_admin)

      return res.status(200).json({
        title: 'password changed',
        user: changePass
      })
    }
    console.info('wrong password')
    res.sendStatus(401)
  })
})

router.put('/update-profile', async (req, res) => {
  const user = req.body

  await userService.update(user.id, user.name, user.password, user.date_of_birth, user.address, user.phone_number, user.email, user.gender, user.is_admin, user.avatar)
  .catch(e => console.error(e))

  res.send(user)
})

module.exports = router
