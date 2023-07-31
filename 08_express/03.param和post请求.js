const express = require("express")
const path = require("node:path")

const app = express()

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")))

// 引入解析请求体的中间件
app.use(express.urlencoded())

// 添加一个路由读取get请求的参数
// /login --> http://localhost:3000/login
app.get("/login", (req, res) => {
    // 获取用户发送的数据
    if (req.query.username === "admin" && req.query.password === "123123") {
        res.send("登陆成功")
    } else {
        res.send("用户名或密码错误！！！")
    }
})

app.post("/login", (req, res) => {
    // 通过req.body来获取post请求的参数（请求体中的参数）
    // 默认情况下express不会自动解析请求体，需要通过中间件来为他增加功能
    const username = req.body.username
    const password = req.body.password

    if (username === "admin" && password === "123123") {
        res.send("登陆成功")
    } else {
        res.send("用户名或密码错误！！！")
    }
})

// get请求发送参数的第二种方式
// /hello/:id 当用户访问/hello/xxx 时就会触发
// 在路径中以:命名的部分称为param ，在get请求中可以解析为请求参数
// param传参不会传递特别复杂的参数
app.get("/hello/:id", (req, res) => {
    // 通过req.params属性来获取参数
    console.log(req.params)
    res.send("hello路由")
})

app.listen(3000, () => {
    console.log("启动成功~~")
})