if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const router = require("./routes/index")
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")
// const port = 3000


app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(router)

app.use(errorHandler)

// app.listen (port , ()=> {
//     console.log(`I LOVE YOUUUUUUUUUU ${port}`);
// })


module.exports = app //(ini buat testing )