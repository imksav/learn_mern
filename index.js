let express = require("express")
let app = express()

app.use(express.json())

app.get("/student-read", (req, res) => {
     res.send("Student View API")
})

app.post("/student-insert", (req, res) => {
     res.send("Student Insert API")
})

app.listen("5000")