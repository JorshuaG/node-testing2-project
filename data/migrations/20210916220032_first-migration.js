exports.up = async function (knex) {
  await knex.schema.createTable("pokemon", (table) => {
    table.increments("pokeId");
    table.string("pokemon_name").notNullable();
    table.string("pokemon_type").notNullable();
    table.string("pokemon_nickname");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("pokemon");
};
