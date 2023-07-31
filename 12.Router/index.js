const express = require("express")
const path = require("node:path")
const fs = require("node:fs/promises")
const app = express()

const cookieParser = require("cookie-parser")

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(cookieParser())

// const userRouter = require("./routers/user")
// const goods = require("./routers/goods")
// 使路由生效
// app.use("/user",userRouter)
// app.use("/goods",goods)

app.use("/students", require("./routers/students"))

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/get-cookie",(req,res)=>{

    // 给客户端发送一个cookie
    res.cookie("username","admin")
    res.send("cookie已经发送")
})
app.get("/hello",(req,res)=>{
    /* 
        需要安装中间件来时的express可以解析cookie
            1.安装cookie-parser
            2.引入
            3.设置为中间件
    */
    // req.cookies 用来读取客户端发来的cookie

    res.send("hello路由")
})

app.post("/login", (req, res) => {
    /* 
        HTTP协议是一个无状态协议，
            服务器无法区分请求是否发送自同一个客户端

            cookie
                -cookie是HTTP协议中用来解决无状态问题的技术
                -cookie本质即使一个头
                    -服务器以响应头的形式将cookie发送给客户端
                        客户端收到以后会将其存储，并在下次向服务器发送请求时将其传回
                        这样服务器就能根据cookie来识别客户端
    */
    const { username, password } = req.body
    if (username === "admin" && password === "123123") {
        // res.send("登陆成功")
        // 将用户名放入cookie
        res.cookie("username",username)
        res.redirect("/students/list")
    } else {
        res.send("用户名或者密码错误")
    }
})


app.use((req, res) => {
    res.status(404)
    res.send("页面不见了~~~")
})
app.listen(3000, () => {
    console.log("启动成功")
})