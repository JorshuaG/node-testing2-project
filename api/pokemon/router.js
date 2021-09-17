const express = require("express");
const Pokemon = require("./model");
const router = express.Router();

router.post("/", (req, res, next) => {
  Pokemon.insert(req.body)
    .then((poke) => {
      res.status(201).json(poke);
    })
    .catch(next);
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const delPoke = await Pokemon.remove(id);
  res.status(200).json(delPoke);
});

module.exports = router;
