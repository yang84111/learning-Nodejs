const express = require("express")
const Router = express.Router()
const fs = require("node:fs/promises")
const path = require("node:path")
let STUDENT_ARR = require("../data/students.json")

Router.use((req,res,next)=>{
    if(req.session.loginUser){
        next()
    }else{
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

    res.render("students", { stus: STUDENT_ARR })
})

// 添加学生
Router.post("/add", (req, res, next) => {
    const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1
    const newUser = {
        id,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address
    }
    STUDENT_ARR.push(newUser)

    // 调用next交给后续路由继续处理
    next()
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