const express = from("express");
const shared = from("shared");

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/greeting", (req, res) => {
  console.log(shared());
  res.send({
    message: `Hello, ${req.query.name || "World"}!`,
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
