import mongoose from "mongoose";

export const dbConnection = () => {
  console.log("Connecting to MongoDB...");
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "SumagoTaskManagement",
    })
    .then(() => {
      console.log("Connected to HJ database MONGO atlas !");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database : ${err}`);
    });
};
