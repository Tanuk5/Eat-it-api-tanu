import { env } from "./src/env";
import { App } from "./src/app";
import { __middleware } from "./src/middleware";
import { allRoutes } from "./src/route";

const dotenv = require('dotenv');
dotenv.config()

const PORT: number = env().port; 

const app = new App(PORT, __middleware, allRoutes);

try {
  const {user, pw, name, account} = env().db;
  const DB_URI = env().db.uri(user,pw,name,account);
  app.mongoDB(DB_URI);
} catch(e) {
  console.log(e);
  console.log("Failed to create DB Connection string");
}

app.listen();