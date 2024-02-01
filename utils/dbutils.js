import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = await MongoClient.connect(
      "mongodb+srv://joykumar:Googletest@cluster1.sxidkwv.mongodb.net/?retryWrites=true&w=majority"
    );
  
    return client;
}

export async function connectToDatabaseTwo() {
  const connectionStrings = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.sxidkwv.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

  const client = await MongoClient.connect(connectionStrings);

  return client;
}
  
export async function insertDocument(client,dbName,collection, document) {
    const db = client.db(dbName);
    return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client,dbName,collection,sort){
    const db = client.db(dbName);

    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray();

    return documents;
}