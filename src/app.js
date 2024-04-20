const express = require("express")

const authController = require("./authentication.js")

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("", authController)

app.listen(port, () => {
    console.log("Billing API running on port:", port)
})