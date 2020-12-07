// Update with your config settings.
require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = {
  development: {
    client: "pg",
    connection: {
      user: "postgres",
      password: "aeroplane",
      database: "users",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
