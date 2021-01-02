import knex from 'knex'

const config = require("../../knexfile")

const db = knex(config)

export default db

export {
  db,
  config
}