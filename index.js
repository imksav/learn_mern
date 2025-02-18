let express = require("express");
let mongoose = require("mongoose");

const enquiryRoutes = require("./App/routes/web/enquiryRoutes");
require("dotenv").config();

let app = express();
app.use(express.json());

app.use("/api/", enquiryRoutes);

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
