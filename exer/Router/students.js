const express = require("express")
const fs = require("node:fs/promises")
const path = require("node:path")
let STUDENTS_ARR = require("../data/students.json")

const uuid = require("uuid").v4
const Router = express.Router()

Router.get("/", (req, res) => {
    // const token = uuid()
    // console.log(token)
    res.render("login")
})

Router.post("/login", (req, res) => {
    const { username, password } = req.body
    if (username === "admin" && password === "123123") {
        req.session.loginUser = username
        // console.log(req.session.loginUser)

        req.session.save(() => {
            res.redirect("/students/list")
        })
    } else {
        res.send("用户名或者密码错误！！！")
    }
})

Router.use((req, res, next) => {
    if (req.session.loginUser) {
        next()
    } else {
        res.redirect("/students")
    }
})

Router.get("/list", (req, res) => {
    const crsfToken = uuid()
    req.session.token = crsfToken
    res.render("students", { stus: STUDENTS_ARR, crsfToken })
})

Router.post("/add", (req, res, next) => {
    const crsfToken = req.body.crsf
    if (req.session.token === crsfToken) {
        req.session.token = null

        const id = STUDENTS_ARR.at(-1) ? STUDENTS_ARR.at(-1).id + 1 : 1
        const newStu = {
            id,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            address: req.body.address,
        }
        STUDENTS_ARR.push(newStu)

        req.session.save(() => {
            next()
        })
    } else {
        res.status(404)
        res.send("token错误~~~")
    }

})

Router.get("/delete", (req, res, next) => {
    const id = +req.query.id
    STUDENTS_ARR = STUDENTS_ARR.filter(stu => stu.id != id)
    next()
})
Router.get("/to-update", (req, res) => {
    const id = +req.query.id
    const student = STUDENTS_ARR.find(stu => stu.id == id)
    res.render("update", { student })
})
Router.post("/update", (req, res, next) => {
    const { id, name, age, gender, address } = req.body
    const student = STUDENTS_ARR.find(item => item.id == id)

    student.name = name
    student.age = +age
    student.gender = gender
    student.address = address

    next()
})

Router.use((req, res) => {
    fs.writeFile(
        path.resolve(__dirname, "../data/students.json"),
        JSON.stringify(STUDENTS_ARR)
    ).then(() => {
        res.redirect("/students/list")
    }).catch(() => {
        res.send("操作失败！！")
    })
})


module.exports = Router