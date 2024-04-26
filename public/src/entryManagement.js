const express = require("express")
const session = require("express-session")
const data = require("../data/data.json")
const fs = require("fs")
const path = require("path")

const createPage = path.join(__dirname, "../web/create.html")


const router = express.Router()

router.use(express.static("public"))
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
router.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

router.delete("/delete/:id", (req, res) => {
    const id = String(req.params.id)
    const idx = data.findIndex(entry => String(entry.id) === String(id))
        
    if (idx !== -1) {
        data.splice(idx, 1)
        updatedData = JSON.stringify(data, null, 2)
        fs.writeFileSync("./public/data/data.json", updatedData)
        res.status(200).json({Success: "Data deleted and updated successfully."})
    } else {
        res.status(404).send(`Data with id [${id}] has not been found.`)
    }
})

router.get("/create", (req, res) => {
    if (req.session.auth === "authenticated") {
        res.status(201).sendFile(createPage)
    } else {
        res.status(307).redirect("/login")
    }
})

module.exports = router