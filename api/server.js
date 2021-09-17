const express = require("express");
const pokemonRouter = require("./pokemon/router");

const server = express();

server.use(express.json());
server.use("/api/pokemon", pokemonRouter);

server.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "wild error fled, couldn't catch em all",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
