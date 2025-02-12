// main programs
let express = require("express");
require("dotenv").config();
const { checkToken } = require("./checkToken");

let app = express();
app.use(express.json()); // in-built middleware

// user defined programs

app.get("/", (req, res) => {
  res.send({ status: 1, msg: "Home Page API" });
});

app.get("/news", checkToken, (req, res) => {
  res.send("News API");
});
app.get("/products", (req, res) => {
  res.send({ status: 2, msg: "Product API" });
});

app.get("/products/:id", (req, res) => {
  let currentId = req.params.id;
  res.status(200).json({
    data: { currentId: "Item " + currentId },
  });
  res.send("Product number " + currentId);
});
app.post("/login", (req, res) => {
  console.log(req.body);
  res.send({
    status: 3,
    msg: "Login API",
    bodyData: req.body,
    queryData: req.query,
  });
});



app.listen(process.env.PORT || "5000");