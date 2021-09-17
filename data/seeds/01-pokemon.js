exports.seed = function (knex, Promise) {
  return knex("pokemon").insert([
    {
      pokeId: 1,
      pokemon_name: "Charizard",
      pokemon_type: "Fire",
      pokemon_nickname: "Blaze",
    },
    {
      pokeId: 2,
      pokemon_name: "Blastoise",
      pokemon_type: "Water",
      pokemon_nickname: "Bustoise",
    },
    {
      pokeId: 3,
      pokemon_name: "Venasaur",
      pokemon_type: "Grass",
      pokemon_nickname: "Clippers",
    },
  ]);
};
