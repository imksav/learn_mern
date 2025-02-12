const { MongoClient } = require('mongodb');
let url = "mongodb://localhost:27017";
const client = new MongoClient(dbConnection);
let dbConnection = async () => {
     await client.connect()
     let db = client.db("mongoDBProject_DataBase")
     return db;
}

module.exports={dbConnection}