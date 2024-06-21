import mongoose from "mongoose";
import "dotenv/config";

const URI = process.env.URI;
const main = async () => await mongoose.connect(URI, { dbName: "melonbeat" });

main()
  .then(() => console.log("Database connection successfully"))
  .catch((error) => console.log(`Error connecting to the database: ${error}`));

export default main;
