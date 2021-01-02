const path = require('path')

const basePath = path.join('.', 'src', 'database')

module.exports = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.join(basePath, 'db.sqlite')
  },
  migrations: {
    directory: path.join(basePath, 'migrations'),
  },
  seeds: {
    directory: path.join(basePath, 'seeds'),
  },
};
