require("dotenv").config();
const app = require("./app");
const db = require("./knex");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const PORT = process.env.PORT || 9000;

(async () => {
  try {
    console.log("Running migrations...");
    await db.migrate.latest();
    console.log("Starting express...");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
