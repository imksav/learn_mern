let express = require("express");
let mongoose = require("mongoose");
const enquiryModel = require("./models/enquiry");
require("dotenv").config();

let app = express();
app.use(express.json());

// Insert API
app.post("/api/enquiry-insert", (req, res) => {
  console.log(req.body);
  let { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  let enquiry = new enquiryModel({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
  enquiry
    .save()
    .then(() => {
      res.send({
        status: 1,
        msg: "Enquiry saved successfully",
      });
    })
    .catch((error) => {
      res.send({
        status: 0,
        msg: "Error while saving enquiry",
        error: error,
      });
    });
});

// Get API
app.get("/api/enquiry-list", async (req, res) => {
  let enquiryList = await enquiryModel.find();

  res.status(200).json({
    status: 1,
    msg: "Enquiry List",
    data: enquiryList,
  });
});

// Delete API
app.delete("/api/enquiry-delete/:id", async (req, res) => {
  let enquiryID = req.params.id;
  let deleteEnquiry = await enquiryModel.deleteOne({ _id: enquiryID });
  res.status(200).json({
    status: 1,
    msg: "API delete sucessfully",
    id: enquiryID,
    delResponse: deleteEnquiry,
  });
});

// Update API
app.put("/api/enquiry-update/:id", async (req, res) => {
  let enquiryID = req.params.id;
  let { name, email, phone, message } = req.body;
  let updateObj = {
    name: name,
    email: email,
    phone: phone,
    message: message,
  };
  let updateResponse = await enquiryModel.updateOne(
    { _id: enquiryID },
    updateObj
  );
  res.status(200).json({
    status: 1,
    msg: "Enquiry update successfully",
    data: updateResponse,
    id: enquiryID,
  });
});

// Connect to MongoDB with Error Handling
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
