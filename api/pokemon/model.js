const db = require("../../data/dbConfig");

function get() {
  return null;
}

function getById(pokeId) {
  return null;
}

async function insert(pokemon) {
  const [id] = await db("pokemon").insert(pokemon);
  return db("pokemon").where("pokeId", id).first();
}

async function remove(pokeId) {
  const poke = await db("pokemon").where({ pokeId }).first();
  await db("pokemon").where({ pokeId }).del();
  return poke;
}

module.exports = { get, getById, insert, remove };
