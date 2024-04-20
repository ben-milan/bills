const express = require("express")
const session = require("express-session")
const path = require("path")

const router = express.Router()

router.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../web/index.html"))
})

router.get("/login", (req, res) => {
    if (req.session.auth === "authenticated") {
        res.status(200).sendFile(path.join(__dirname, "../web/index.html"))
    } else {
        router.use(express.static(path.join(__dirname, "../web")))
        res.status(307).sendFile(path.join(__dirname, '../web/login.html'))
    }
})

//CARE WITH THE CSS FILE resp. THE router.use for tmrw

module.exports = router
