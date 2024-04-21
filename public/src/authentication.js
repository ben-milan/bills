const express = require("express")
const session = require("express-session")
const path = require("path")
const SHA256 = require("crypto-js/sha256")
const userCreds = require("../data/user_credentials.json")

const loginPage = path.join(__dirname, "../web/login.html")
const homePage = path.join(__dirname, "../web/index.html")

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

router.get("/", (req, res) => {
    if (req.session.auth === "authenticated") {
        res.sendFile(homePage)
    } else {
        res.redirect("/login")
    }
    
})

router.get("/login", (req, res) => {
    if (req.session.auth !== "authenticated") {
        res.status(307).sendFile(loginPage)

    } else {
        res.status(200).sendFile(homePage)
    }
})

router.post("/login", (req, res) => {
    if(req.session.auth === "authenticated") {
        res.redirect("/")
    } else {
        email = JSON.stringify(SHA256(req.body.email).words)
        pw = JSON.stringify(SHA256(req.body.password).words)

        emailStored = userCreds.find((user) => Array(user.email) === Array(email))
        pwStored = userCreds.find((user) => Array(user.password) === Array(pw))

        if (emailStored !== undefined && pwStored !== undefined) {
            req.session.auth = "authenticated"
            req.session.email = email
            req.session.pw = pw
            res.status(202).redirect("/")
        } else {
            res.status(403).sendFile(loginPage)
        }
        
    }
})

module.exports = router
