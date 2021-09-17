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

function remove(pokeId) {
  return null;
}

module.exports = { get, getById, insert, remove };
