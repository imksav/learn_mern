require("dotenv").config();
const express = require("express");
const { getCollection } = require("./dbConnection");
const { ObjectId } = require("mongodb");

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
app.delete("/delete/:id", async (req, res) => {
  try {
    const userCollection = await getCollection("users");
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }
    console.log(`Deleting user with ID: ${userId}`);
    const result = await userCollection.deleteOne({
      _id: new ObjectId(userId),
    });
    if (result.deletedCount === 1) {
      return res.status(204).send("User Deleted");
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// update API
app.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const update = req.body;
    console.log(update);
    console.log(Object.keys(update).length);
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }
    const userCollection = await getCollection("users");
    const result = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: update }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      status: 1,
      msg: "User updated",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
