const request = require("supertest");
const db = require("../../data/dbConfig");
const { testing } = require("../../knexfile");
const server = require("../server");
const Pokemon = require("./model");

const pokemon1 = {
  pokeId: 1,
  pokemon_name: "Gengar",
  pokemon_type: "Ghost",
  pokemon_nickname: "Sneaky",
};
const pokemon2 = {
  pokeId: 2,
  pokemon_name: "Mew",
  pokemon_type: "Psychic",
  pokemon_nickname: "Wonder",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("pokemon").truncate();
});

afterAll(async () => {
  await db.destroy();
});

test("testing for correct environment variable", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("Pokemon model functions", () => {
  describe("create pokemon", () => {
    test("add pokemon to the db", async () => {
      let pokemon;
      await Pokemon.insert(pokemon1);
      pokemon = await db("pokemon");
      expect(pokemon).toHaveLength(1);

      await Pokemon.insert(pokemon2);
      pokemon = await db("pokemon");
      expect(pokemon).toHaveLength(2);
    });
    test("inserted correct data", async () => {
      const pokemon = await Pokemon.insert(pokemon1);
      expect(pokemon).toMatchObject({
        pokeId: 1,
        pokemon_name: "Gengar",
        pokemon_type: "Ghost",
        pokemon_nickname: "Sneaky",
      });
    });
  });
  describe("[DELETE] pokemon", () => {
    test("deletes pokemon from the db", async () => {
      const [pokeId] = await db("pokemon").insert(pokemon1);
      let poke = await db("pokemon").where({ pokeId }).first();
      expect(poke).toBeTruthy();
      await request(server).delete("/api/pokemon/" + pokeId);
      poke = await db("pokemon").where({ pokeId }).first();
      expect(poke).toBeFalsy();
    });
    test("responds with the deleted pokemon", async () => {
      await db("pokemon").insert(pokemon2);
      let poke = await request(server).delete("/api/pokemon/2");
      expect(poke.body).toMatchObject(pokemon2);
    });
  });
});
