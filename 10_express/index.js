const express = require("express")
const path = require("node:path")
const app = express()
const fs = require("node:fs/promises")

const STUDENT_ARR = require("./data/students.json")


// 将ejs设置为默认的模板引擎
app.set("view engine", "ejs")
// 配置模板的路径
app.set("views", path.resolve(__dirname, "views"))

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

app.get("/hello", (req, res) => {
    res.send("hello")
})

app.get("/students", (req, res) => {
    res.render("students", { stus: STUDENT_ARR })
})

// 创建一个添加学生信息的路由
app.post("/add-students", (req, res) => {
    // 生成一个id
    const id = STUDENT_ARR.at(-1).id + 1
    // 1.获取用户填写的信息
    const newUser = {
        id,
        name: req.body.name,
        age: +req.body.age,
        gender: req.body.gender,
        address: req.body.address,
    }
    // 2.验证用户信息（省略）
    //3.将用户信息添加到数组中
    STUDENT_ARR.push(newUser)
    // 4.返回响应
    // res.send("添加成功")
    // 直接在添加的路由中渲染ejs，会有表单重复提交的问题
    // res.render("students",{stus: STUDENT_ARR})

    // 将新的数据写入到json文件中
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    ).then(() => {
        res.redirect("/students")
    }).catch(() => {
        console.log("添加失败")
    })

    // res.redirect()  用来发起请求的重定向，
    // 用来告诉浏览器向另外一个地址再发起一个请求

})



app.use((req, res) => {
    res.status(404)
    res.send("<h1>网页被偷走辣~~~</h1>")
})


app.listen(3000, () => {
    console.log("服务器启动成功~~")
})