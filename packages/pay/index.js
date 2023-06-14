import express from "express";
import setup from "shared/lib/setup";
import routes from "./routes/payment";

const app = express();

const bootstrap = async () => {
  const { PORT } = setup(app, routes);

  app.listen(PORT, () =>
    console.log(`tripRoute service listening on port ${PORT}!`)
  );
};

bootstrap();
