const {addToCart, changeQty} = require("./cartModule")
let http = require("http")
let server = http.createServer((req, res) => {
     if (req.url == "/about") {
          let obj = {
               status: 1,
               data: [
                    {
                         title: 'Python',
                         des: 'Snake'
                    },
                    {
                         title: 'Java',
                         des: 'Spring'
                    }
               ]
          }
          res.end(JSON.stringify(obj))
     }
     res.end("Welcome to imksav")
})

server.listen("5000") //http://localhost:5000
console.log("Welcome Keshav")
console.log(addToCart())
console.log(changeQty())

