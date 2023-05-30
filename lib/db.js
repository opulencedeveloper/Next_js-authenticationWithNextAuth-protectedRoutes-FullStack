import { MongoClient } from "mongodb";

export async function connectToDatabase() {
    //try catch was not handled here, check the other repo
  const client = MongoClient.connect(
    'mongodb+srv://victorkudos:qgz5r8muN1BiiJPs@cluster0.iogciqk.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );

  return client;
}

