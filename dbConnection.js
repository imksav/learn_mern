require("dotenv").config();
const { MongoClient } = require("mongodb");

// MongoDB Connection URL
const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const dbName = "backend";
let dbInstance;

const dbConnect = async () => {
     if (!dbInstance) {
          try {
               const client = await new MongoClient(url);
               await client.connect();
               console.log("✅ Connected to MongoDB");
               dbInstance = client.db(dbName);
          } catch (error) {
               console.log("❌ MongoDB connection error:", error);
               process.exit(1);
          }
     }
     return dbInstance;
};

const getCollection = async (collectionName) => {
     if (!dbInstance) await dbConnect();
     return dbInstance.collection(collectionName);
};

module.exports={dbConnect, getCollection}
// const client = new MongoClient(url);

// // Database Connection Function
// const dbConnection = async () => {
//      try {
//           await client.connect();
//           let db = client.db("myDB"); // Change "myDB" to your actual database name
//           console.log(`Connected to database: ${db.databaseName}`);
//           return db;
//      } catch (error) {
//           console.error("Database connection error:", error);
//           throw error;
//      }
// };

// // Export the function
// module.exports = { dbConnection };
