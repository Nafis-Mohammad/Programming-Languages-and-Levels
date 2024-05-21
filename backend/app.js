require("dotenv").config()
// require("express-async-errors")'
const cors = require("cors")

const client = require('./db/connection.js')
const express = require('express')


const app = express()
app.use(express.json())

app.use(cors())


const langlevelRouter = require("./routes/langlevelRoute.js")

app.use("/api/langlevel", langlevelRouter)


const port = process.env.PORT || 4000

const start = async () => {
    try {
        // client.connect()
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
    }
}

start()

// app.listen(4000, () => {
//     console.log("Server listening at port 4000...")
// })

// client.connect()

// app.get("/users", (req, res) => {
//     client.query("Select * from users", (err, result) => {
//         if(!err) {
//             res.send(result.rows)
//         }
//     })
//     client.end
// })