require("dotenv").config()
// require("express-async-errors")'
const cors = require("cors")

const {setupDatabase} = require('./db/connection.js')
const express = require('express')


const app = express()
app.use(express.json())

app.use(cors())


const langlevelRouter = require("./routes/langlevelRoute.js")

app.use("/api/langlevel", langlevelRouter)


const port = process.env.PORT || 4000

const start = async () => {
    try {
        await setupDatabase()
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
    }
}

start()