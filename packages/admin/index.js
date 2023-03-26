import express from "express";
import setup from "shared/lib/setup";
import connectMongoDB from "shared/lib/db/mongodb";
import routes from "./routes";

const app = express();

const bootstrap = () => {
  const { PORT } = setup(app);

  app.use(routes);
  connectMongoDB();

  app.listen(PORT, () =>
    console.log(`Admin service listening on port ${PORT}!`)
  );
};

bootstrap();
