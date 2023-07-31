const express = require("express")
const path = require("node:path")
const fs = require("node:fs/promises")
const app = express()

const cookieParser = require("cookie-parser")
const session = require("express-session")
const FileStore = require("session-file-store")(session)

// 引入uuid
const uuid = require("uuid").v4

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(cookieParser())
app.use(session({
    store: new FileStore({
        path: path.resolve(__dirname, "./sessions"),
    }),
    secret: "hello"
}))

/* 
    csrf攻击
        -跨站请求伪造
        -现在浏览器一般都不会在跨域的情况下自动发送cookie
            这个设计就是为了避免csrf攻击

        解决：
            1.使用referer头来检查请求的来源
            2.使用验证码
            3.尽量使用post请求，同时结合token

            -token(令牌)
                -可以在创建表单时随机生成一个令牌
                    然后将令牌存储到session中并通过ejs发送给用户
                    然后用户提交表单时必须将token发回才可以进行后续操作
                    (可以使用uuid来生成token)
*/
app.use("/students", require("./routers/students"))

app.get("/", (req, res) => {
    const token = uuid()
    console.log(token)
    res.render("login")
})

app.get("/logout", (req, res) => {
    // 使session失效
    req.session.destroy(()=>{
        res.redirect("/")
    })
})

app.post("/login", (req, res) => {
    const { username, password } = req.body
    if (username === "admin" && password === "123123") {
        // 这里仅仅将值添加到了内存的session中，没有写入到文件
        req.session.loginUser = username

        // 为了使session立刻存储需要手动调用save
        req.session.save(()=>{
            res.redirect("/students/list")
        })
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