import { MongoClient } from "mongodb";

const dbUser = "basantapoudel1221_db_user";
const dbPassword = encodeURIComponent("mongoDB@1221");

const url = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.5gw9x8a.mongodb.net/?appName=Cluster0`;
const database = "college";
const collection = "students";

const client = new MongoClient(url);

// client.connect().then(() => {
//     console.log("Connected to MongoDB Atlas");
//     // const db = client.db(database);
//     // const studentCollection = db.collection(collection);

//     // // Example: Insert a document
//     // studentCollection.insertOne({
//     //     name: "John Doe",
//     //     email: ""
//     // })

// })

//  async function dbConnection() {
//     const db = client.db(database);
//     const studentCollection = db.collection(collection);
//     const result = await studentCollection.find().toArray();
//     console.log(result);
// }

async function dbConnection() {
    try {
      await client.connect();
  
      console.log("Connected to MongoDB Atlas");
  
      const db = client.db(database);
  
      const result = await db.collection(collection).find().toArray();
  
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

dbConnection();