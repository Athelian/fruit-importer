const knex = require("knex");
require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const db = knex({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    "postgres://postgres:aeroplane@localhost:5432/users",
  searchPath: "public",
});

console.log(db.select("name").table("users"));

module.exports = db;
