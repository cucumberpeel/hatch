import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import { ServerApiVersion } from 'mongodb';

import { config } from 'dotenv';
config();

// global lists
// const ingredientList = [];
// const recipeList = [];

const uri = process.env.DSN;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);