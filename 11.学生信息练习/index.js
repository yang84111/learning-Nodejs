const express = require("express")
const path = require("node:path")
const fs = require("node:fs/promises")
const app = express()

let STUDENT_ARR = require("./data/students.json")

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

/* 
    点击删除链接后，删除当前数据
        通过id来删除学生信息
*/
app.get("/delete", (req, res) => {
    // 获取要删除的学生的id
    const id = +req.query.id
    // 根据id删除学生
    STUDENT_ARR = STUDENT_ARR.filter(stu => stu.id != id)
    // 将新的数组写入到文件中
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    ).then(() => {
        res.redirect("/students")
    }).catch(() => {
        console.log("删除失败")
    })
})
/* 
    修改    
        -点击修改链接，显示一个表单，表单里有要修改学生的信息
        1.点击修改链接
        2.跳转到一个路由
            路由返回一个页面中，页面中一个表单，显示学生信息
        3.用户填写表单点击按钮提交到一个新的路由...
*/
app.post("/update-student", (req, res) => {
    // 获取学生id
    // const id = req.query.id
    const { id,name,age,gender,address} = req.body
    const student = STUDENT_ARR.find(item => item.id == id)

    student.name = name
    student.age = +age
    student.gender = gender
    student.address = address

    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    ).then(() => {
        res.redirect("/students")
    }).catch(() => {
        console.log("修改失败")
    })
    
})
app.get("/to-update", (req, res) => {
    const id = +req.query.id
    // 获取要修改的学生信息
    const student = STUDENT_ARR.find(item => item.id == id)
    res.render("update", { student })
})


app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.get("/students", (req, res) => {
    res.render("students", { stus: STUDENT_ARR })
})

app.post("/add-students", (req, res) => {
    const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1
    const newUser = {
        id,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address
    }
    STUDENT_ARR.push(newUser)
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    ).then(() => {
        res.redirect("/students")
    }).catch(() => {
        console.log("添加失败")
    })
})


app.use((req, res) => {
    res.status(404)
    res.send("网页走丢了~~~")
})
app.listen(3000, () => {
    console.log("启动成功")
})