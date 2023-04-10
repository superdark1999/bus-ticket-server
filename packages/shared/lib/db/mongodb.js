import mongoose from "mongoose";

const connectMongoDB = () => {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0",
    {
      useNewUrlParser: true,
      // dbName: process.env.MONGODB_NAME,
    }
  );

  const connection = mongoose.connection;

  connection.on("error", (error) => {
    console.log(error);
  });
  // enable this to debug.
  // mongoose.set('debug', true);
  connection.once("connected", () => {
    console.log("database connected");
  });

  return connection;
};

export default connectMongoDB;
