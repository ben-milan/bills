const express = require("express")
const session = require("express-session")
const path = require("path")
const SHA256 = require("crypto-js/sha256")
const userCreds = require("../data/user_credentials.json")
const webCode = require("../data/code.json")
const fs = require("fs")

const loginPage = path.join(__dirname, "../web/login.html")
const homePage = path.join(__dirname, "../web/index.html")
const signupPage = path.join(__dirname, "../web/signup.html")
const notauthPage = path.join(__dirname, "../web/not-authorized.html")

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
        res.status(200).redirect("/")
    }
})

router.post("/login", (req, res) => {
    if(req.session.auth === "authenticated") {
        res.redirect("/")
    } else {
        email = JSON.stringify(SHA256(req.body.email).words)
        pw = JSON.stringify(SHA256(req.body.password).words)

        emailStored = userCreds.find((user) => String(user.email) === String(email))
        pwStored = userCreds.find((user) => String(user.password) === String(pw))

        if (emailStored !== undefined && pwStored !== undefined) {
            req.session.auth = "authenticated"
            req.session.email = email
            req.session.pw = pw
            res.status(202).redirect("/")
        } else {
            res.status(307).redirect("/signup")
        }
        
    }
})

router.get("/signup", (req, res ) => {
    if (req.session.auth !== "authenticated") {
        res.status(200).sendFile(signupPage)
    } else {
        res.status(200).redirect("/")
    }
})

router.post("/signup", (req, res) => {
    if (req.session.auth === "authenticated") {
        res.redirect("/")
    } else {
        //KlenkBillingAPI
        const codeWeb = JSON.stringify(SHA256(req.body.signup_code).words) 
        const codeStored = webCode.find((entry) => String(entry.code) === String(codeWeb))
        
        const email = JSON.stringify(SHA256(req.body.email).words)
        const pw = JSON.stringify(SHA256(req.body.password).words)
        
        const emailStored = userCreds.find((user) => String(user.email) === String(email))
        const pwStored = userCreds.find((user) => String(user.password) === String(pw))
        
        if (emailStored === undefined && pwStored === undefined) {
            if (codeStored !== undefined) {
                req.session.auth = "authenticated"
                req.session.email = email
                req.session.password = pw
                userCreds.push({ email: email, password: pw })
                
                updatedJson = JSON.stringify(userCreds, null, 2)
                fs.writeFileSync("./public/data/user_credentials.json", updatedJson)

                res.status(200).redirect("/")
            } else {
                res.status(403).redirect("/not-authorized")
            }
        } else {
            req.session.auth = "authenticated"
            res.status(200).redirect("/")
        }
    }
})

router.get("/not-authorized", (req, res) => {
    if (req.session.auth === "authenticated") {
        res.status(200).redirect("/")
    } else {
        res.status(200).sendFile(notauthPage)
    }
})

module.exports = router
