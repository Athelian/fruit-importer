exports.up = function (knex) {
  return knex.schema.table("users", function (table) {
    table.string("choice");
  });
};

exports.down = function (knex) {};
