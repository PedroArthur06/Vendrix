import "dotenv/config";
import { app } from "./app";
import { connectDatabases } from "../database";

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDatabases();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
