exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments().index();
    table.text("name").notNullable();
    table.text("address").notNullable();
    table.float("lat").notNullable();
    table.float("lng").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumns("name", "address", "lat", "lng");
  });
};
