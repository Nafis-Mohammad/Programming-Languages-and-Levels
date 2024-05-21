const client = require('./connectin.js')
const express = require('express')
const app = express()

app.listen(4000, () => {
    console.log("Server listening at port 4000...")
})

client.connect()

app.get("/users", (req, res) => {
    client.query("Select * from users", (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    client.end
})