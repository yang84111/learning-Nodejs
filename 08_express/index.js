const express = require("express")
const path = require("node:path")
const app = express()

// 创建一个数组来存储用户信息
const USERS = [
    {
        username: "admin",
        password: "123123",
        nickname: "超级管理员",
    }, {
        username: "sunwukong",
        password: "123456",
        nickname: "齐天大圣",
    }
]

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")))

// 引入解析请求体的中间件
app.use(express.urlencoded())


app.post("/login", (req, res) => {
    // 通过req.body来获取post请求的参数（请求体中的参数）
    // 默认情况下express不会自动解析请求体，需要通过中间件来为他增加功能
    const username = req.body.username
    const password = req.body.password

    // 获取到用户名和密码后，根据信息去数组中查找用户
    const loginUser = USERS.find((item) => {
        return item.username === username && item.password === password
    })
    if (loginUser) {
        res.send(`登陆成功${loginUser.nickname}`)
    } else {
        res.send("用户名或密码错误！！！")
    }

    // if (username === "admin" && password === "123123") {
    //     res.send("登陆成功")
    // } else {
    //     res.send("用户名或密码错误！！！")
    // }
})

app.post("/register", (req, res) => {
    // 获取用户输入的数据
    const { username, password, repwd, nickname } = req.body
    // 验证数据是否正确,,验证用户名是否存在
    const user = USERS.find((item) => {
        return item.username === username || item.nickname === nickname
    })
    if (!user) {
        USERS.push({
            username,
            password,
            nickname
        })
        res.send(`注册成功，你好${nickname}`)
    } else {
        res.send(`用户名${nickname}已存在`)
    }
})

app.listen(3000, () => {
    console.log("启动成功~~")
})