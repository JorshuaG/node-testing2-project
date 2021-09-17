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
    test("inserted correct data", async () => {});
  });
});
