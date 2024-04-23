const express = require("express")

const router = express.Router()

router.use(express.static("public"))
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.get("delete", (req, res) => {
    res.send("test")
})

router.post("delete", (req, res) => {
    console.log(req.body)
})

module.exports = router