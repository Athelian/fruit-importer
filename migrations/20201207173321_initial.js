exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments().index();

    table.text("name").notNullable();
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();
    table.text("fruit").notNullable();
  });
};

exports.down = function (knex) {};
