const express = require("express");

const PORT = process.env.PORT || 8082;
const app = express();

app.get("/greeting", (req, res) => {
  console.log(shared());
  res.send({
    message: `Hello, ${req.query.name || "World"}!`,
  });
});

app.listen(PORT, () =>
  console.log(`Booking service listening on port ${PORT}!`)
);
