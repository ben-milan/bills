const fs = require("fs")

const express = require("express")

const router = express.Router()

router.use(express.static("public"))
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.delete("/delete", (req, res) => {
    console.log(req.body)

    updatedData = JSON.stringify(req.body, null, 2)
    fs.writeFileSync("./public/data/data.json", updatedData)

    res.status(200)

})

module.exports = router