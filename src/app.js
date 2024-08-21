const express = require("express")
const path = require('path');

const authController = require("./authentication.js")
const entryController = require("./entryManagement.js")

const app = express()
const port = 3000

app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "../../bills")));
app.use(express.static(path.join(__dirname, "../public")));

console.log(path.join(__dirname, "../../bills"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("", authController)
app.use("", entryController)

app.listen(port, () => {
    console.log("Billing API running on port:", port)
})