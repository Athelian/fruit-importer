const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  searchPath: "public",
});

module.exports = db;
