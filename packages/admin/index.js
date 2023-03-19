const express = require("express");
const shared = require("shared");

const PORT = process.env.PORT || 8081;
const app = express();

app.get("/greeting", (req, res) => {
  console.log(shared());
  res.send({
    message: `Hello, ${req.query.name || "World"}!`,
  });
});

app.listen(PORT, () => console.log(`Admin service listening on port ${PORT}!`));
