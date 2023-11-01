import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import postProducts from "./resolvers/postProducts.ts";
import getProducts from "./resolvers/getProducts.ts";
import deleteProducts from "./resolvers/deleteProducts.ts";
import postClient from "./resolvers/postClient.ts";
import getClient from "./resolvers/getClient.ts";
import deleteClient from "./resolvers/deleteClient.ts";
import postInvoice from "./resolvers/postInvoice.ts";
import getInvoice from "./resolvers/getInvoice.ts";

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
  await mongoose.connect(MONGO_URL);
  console.info("Se conecta bien a Mongo");
}catch(e){
  console.error(e);
}

const app = express();
app.use(express.json());

app
  .get("/getProducts", getProducts)
  .post("/postProducts", postProducts)
  .delete("/deleteProducts/:id", deleteProducts)
  .post("/postClient", postClient)
  .get("/getClient", getClient)
  .delete("/deleteClient/:id", deleteClient)
  .post("/invoice", postInvoice)
  .get("/invoice/:id", getInvoice);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});