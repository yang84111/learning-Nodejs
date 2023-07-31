const express = require("express")
const Router = express.Router()
const fs = require("node:fs/promises")
const path = require("node:path")
let STUDENT_ARR = require("../data/students.json")

const uuid = require("uuid").v4
Router.use((req, res, next) => {

    // 获取一个请求头referer
    const referer = req.get("referer")
    // if(!referer || !referer.startsWith("http://localhost:3000/")){
    //     res.status(403).send("没有权限！！")
    //     return
    // }

    // console.log(req.session.loginUser)
    if (req.session.loginUser) {
        next()
    } else {
        res.redirect("/")
    }
})

// 学生列表
Router.get("/list", (req, res) => {
    // 默认有效期是一次会话
    // if(req.session.loginUser){
    //     res.render("students", { stus: STUDENT_ARR })
    // }else{
    //     res.redirect("/")
    // }
    const csrfToken = uuid()

    req.session.csrfToken = csrfToken

    req.session.save(() => {
        res.render("students", { stus: STUDENT_ARR, username: req.session.loginUser, csrfToken })
    })
})

// 添加学生
Router.post("/add", (req, res, next) => {

    // 客户端发送的token
    const csrfToken = req.body._csrf
    // 将客户端的token跟session中的token进行比较
    if (req.session.csrfToken === csrfToken) {
        req.session.csrfToken = null

        const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1
        const newUser = {
            id,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            address: req.body.address
        }
        STUDENT_ARR.push(newUser)

        req.session.save(() => {
            // 调用next交给后续路由继续处理
            next()
        })
    } else {
        res.status(403).send("token错误")
    }


})
// 删除学生
Router.get("/delete", (req, res, next) => {
    const id = +req.query.id
    STUDENT_ARR = STUDENT_ARR.filter(stu => stu.id != id)
    next()
})

Router.post("/update-student", (req, res, next) => {
    const { id, name, age, gender, address } = req.body
    const student = STUDENT_ARR.find(item => item.id == id)

    student.name = name
    student.age = +age
    student.gender = gender
    student.address = address

    next()
})
Router.get("/to-update", (req, res) => {
    const id = +req.query.id
    const student = STUDENT_ARR.find(item => item.id == id)
    res.render("update", { student })
})


Router.use((req, res) => {
    fs.writeFile(
        path.resolve(__dirname, "../data/students.json"),
        JSON.stringify(STUDENT_ARR)
    ).then(() => {
        res.redirect("/students/list")
    }).catch(() => {
        res.send("操作失败！！！")
    })
})

module.exports = Router