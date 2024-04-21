const express = require("express")

const authController = require("./authentication.js")

const app = express()
const port = 3000

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("", authController)

app.listen(port, () => {
    console.log("Billing API running on port:", port)
})