const server = require("./api/pokemon");
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Tryna catch em all on port ${PORT}...`);
});
