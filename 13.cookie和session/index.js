const express = require("express")
const path = require("node:path")
const fs = require("node:fs/promises")
const app = express()

const cookieParser = require("cookie-parser")
const session = require("express-session")

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(cookieParser())
app.use(session({
    secret:"hello"
}))

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
    res.send("hello路由")
})

app.post("/login", (req, res) => {
    const { username, password } = req.body
    if (username === "admin" && password === "123123") {
        // res.cookie("username",username)
        // 登陆成功后将用户信息放入到session中
        req.session.loginUser = username
        
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