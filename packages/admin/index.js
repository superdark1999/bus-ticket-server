import express from "express";
import setup from "shared/lib/setup";
import connectMongoDB from "shared/lib/db/mongodb";

const app = express();

app.get("/greeting", (req, res) => {
  console.log(shared());
  res.send({
    message: `Hello, ${req.query.name || "World"}!`,
  });
});

const bootstrap = () => {
  const { PORT } = setup(app);

  // app.use(routes);
  connectMongoDB();

  app.listen(PORT, () =>
    console.log(`Admin service listening on port ${PORT}!`)
  );
};

bootstrap();
