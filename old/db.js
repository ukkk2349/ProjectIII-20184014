// const mysql = require('mysql')

// const connection = mysql.createConnection({
//   host: '127.0.0.1',
//   port: 3306,
//   user: 'user',
//   password: '321Flash!',
//   database: 'online_testing'
// })

// connection.connect()
// connection.once('connect', () => {
//   console.info('DB Connected...!')
// })
// process.once('exit', () => {
//   connection.destroy
// })

// function getConnection(){
//   return connection
// }

// module.exports = {
//   getConnection
// }
const { Model } = require('objection');
const Knex = require('knex');
const { vModelRadio } = require('vue');

const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "pet.db"
  }
})

Model.knex(knex);

class Pet extends Model {
  static get tableName() {
    return 'pets';
  }
}

class Food extends Model {
  static get tableName() {
    return 'food';
  }
}

class User extends Model {
  static get tableName() {
    return 'users';
  }
}

class Request extends Model {
  static get tableName() {
    return 'requests';
  }
  static relationMappings = {
    users: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: 'requests.id',
        to: 'users.id'
      }
    }
  }
}

class Cart extends Model {
  static get tableName() {
    return 'cart';
  }
  static relationMappings = {
    users: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: 'cart.user_id',
        to: 'users.id'
      }
    },
    pets: {
      relation: Model.HasManyRelation,
      modelClass: Pet,
      join: {
        from: 'cart.product_id',
        to: 'pets.id'
      }
    },
    food: {
      relation: Model.HasManyRelation,
      modelClass: Food,
      join: {
        from: 'cart.product_id',
        to: 'food.id'
      }
    }
  }
}

class Sale extends Model {
  static get tableName() {
    return 'sale'
  }
  $beforeInsert() {
    this.date = new Date().toLocaleString('en-US');
  }
}

async function createTables() {
  console.log('run creating table')

  const hasPetTabel = await knex.schema.hasTable('pets')
  if (!hasPetTabel) {
    await knex.schema.createTable('pets', table => {
      table.increments('id').primary()
      table.string('name')
      table.integer('weight')
      table.string('species')
      table.text('description')
      table.integer('price')
      table.string('state')
      table.integer('sale')
      table.string('images')
      table.integer('stock')
    })
  };

  const hasFoodTable = await knex.schema.hasTable('food')
  if (!hasFoodTable) {
    await knex.schema.createTable('food', table => {
      table.increments('id').primary()
      table.string('name')
      table.integer('calories')
      table.float('weight')
      table.text('description')
      table.float('price')
      table.float('sale')
      table.string('images')
      table.integer('stock')
    })
  };

  const hasUserTable = await knex.schema.hasTable('users')
  if (!hasUserTable) {
    await knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('password')
      table.string('date_of_birth')
      table.string('address')
      table.string('phone_number')
      table.string('email')
      table.string('gender')
      table.integer('is_admin')
      table.text('avatar')
    })
  };

  const hasRequestsTable = await knex.schema.hasTable('requests')
  if (!hasRequestsTable) {
    await knex.schema.createTable('requests', table => {
      table.increments('id').primary()
      table.integer('user_id').references('id').inTable('users')
      table.string('type')
      table.text('detail')
      table.integer('range')
      table.integer('state')
    })
  };

  const hasCartTable = await knex.schema.hasTable('cart')
  if (!hasCartTable) {
    await knex.schema.createTable('cart', table => {
      table.increments('id').primary()
      table.integer('user_id').references('id').inTable('users')
      table.integer('product_id').references('id').inTable('pets')
      table.string('product_infomation')
      table.integer('quantity')
      table.integer('state')
    })
  };

  const hasSaleTable = await knex.schema.hasTable('sale')
  if (!hasSaleTable) {
    await knex.schema.createTable('sale', table => {
      table.increments('order_id').primary()
      table.integer('user_id')
      table.string('username')
      table.string('list')
      table.float('total')
      table.string('date')
    })
  }
}

module.exports = {
  createTables,
  User,
  Pet,
  Food,
  Request,
  Cart,
  Sale
}
