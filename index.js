require("dotenv").config();
const express = require("express");
const { getCollection } = require("./dbConnection");

const app = express();
app.use(express.json());

// users display API
app.get("/", async (req, res) => {
  try {
    const userCollection = await getCollection("users");
    const result = await userCollection.find().toArray();
    res.status(200).json({
      status: 1,
      msg: "Users List",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
  // res.send("Welcome to GET API");
});

// user insert API
app.post("/insert", async (req, res) => {
  try {
    const userCollection = await getCollection("users");
    const data = req.body;

    // check if the data is array or object
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return res.status(400).json({ error: "Empty array received" });
      }
      // insert multiple data
      const result = await userCollection.insertMany(data);
      return res.status(200).json({
        status: 1,
        msg: `${result.insertedCount} users added.`,
        data: result,
      });
    } else if (typeof data === "object") {
      console.log(data.length);
      if (data.length === undefined || data.length === 0) {
        return res.status(400).json({ error: "Empty data received" });
      }
      // insert a single data
      const result = await userCollection.insertOne(data);
      return res.status(200).json({
        status: 1,
        msg: "User added",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// delete API
app.delete("/delete/:id?", async (req, res) => {
  try {
    const userCollection = await getCollection("users");
    console.log(req.params.id);
    const result = await userCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    //     return res.status(201).json({
    //       //    status: 1,
    //       msg: "Item Deleted",
    //       deletedData: result,
    //     });
    if (result.deletedCount === 1) {
      return res.status(201).json({
        //    status: 1,
        msg: "Item Deleted",
        deletedData: result,
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const {ObjectId} = require("mongodb")
// const { dbConnection } = require("./dbConnection");

// const app = express();
// app.use(cors());
// app.use(express.json()); // Middleware for JSON parsing

// // Home Route
// app.get("/", async (req, res) => {
//      let myDB = await dbConnection();
//      let studentCollection = myDB.collection("students");
//      let data = await studentCollection.find().toArray();
//      res.status(201).json({
//             message: "Student list",
//           //   database: dbName,
//             insertedData: data
//         });
// //     res.send("Welcome to the API!");
// });

// // Student Insert Route
// app.post("/student-insert", async (req, res) => {
//     try {
//         let myDB = await dbConnection(); // Get the database instance
//         let dbName = myDB.databaseName; // Get database name

//         let { sName, sEmail } = req.body;
//         if (!sName || !sEmail) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }

//         let studentCollection = myDB.collection("students"); // Create collection dynamically
//         let obj = { sName, sEmail };
//         let result = await studentCollection.insertOne(obj);

//         res.status(201).json({
//             message: "Student inserted successfully",
//             database: dbName,
//             insertedData: result
//         });
//     } catch (error) {
//         console.error("Error inserting student:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
// app.delete("/student-delete/:id?", async (req, res) => {
//      let paramsData = req.params.id;
//      console.log(paramsData)
//      let myDB = await dbConnection()
//      let dbName = myDB.databaseName;
//      let studentCollection = myDB.collection("students")
//      let deleteItem = await studentCollection.deleteOne({ _id: new ObjectId(paramsData) })
//      res.status(201).json({
//           message: "Delete user id",
//           database: dbName,
//           deltedData: deleteItem
//      })
//      res.send("Delete API")
// })

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
