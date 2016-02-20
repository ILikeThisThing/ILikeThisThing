// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'ilikethis_dev'
    },
    seeds: {
      directory: './seeds/tags'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'ilikethis_test'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

}

