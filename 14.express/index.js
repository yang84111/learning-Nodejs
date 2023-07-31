const express = require("express")
const path = require("node:path")
const fs = require("node:fs/promises")
const app = express()

const cookieParser = require("cookie-parser")
const session = require("express-session")
const FileStore = require("session-file-store")(session)

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(cookieParser())
app.use(session({
    store: new FileStore({
        // path用来指定session本地文件的路径
        path: path.resolve(__dirname, "./sessions"),
        // secret:"haha"  // 加密（目前报错
        // session的有效时间  默认一小时 时间结束后session自动失效
        // ttl:3600,
        // 默认情况下filestore会每间隔一小时清除一次session对象
        //reapInterval:10   // 每隔十秒清除过期的session ，单位秒，默认一小时

    }),
    secret: "hello"
}))
/* 
    session是服务器中的一个对象，这个对象用来存储用户的信息
        每一个session都会有一个惟一的id，session创建后，
        id会以cookie的形式发送给浏览器
    浏览器收到以后每次访问都会将id发回，服务器就可以根据id找到对应的session

    session什么时候会失效：
        1.浏览器的cookie没了
        2.服务器中的session对象没了

    express-session默认是将session存储到内存中的，
        服务器一旦重启session会自动重置
    我们使用session时通常会对session进行持久化操作（写到文件或数据库里）

    如何将session存储到本地文件中
        -需要引入一个中间件session-file-store
        1.安装 
            yarn add session-file-store
        2.引入
            const FileStore = require("session-file-store")(session)
        3.设置为中间件
            app.use(session({
                store:new FileStore({}),
                secret:"hello"
            }))
*/

app.use("/students", require("./routers/students"))

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/logout", (req, res) => {
    // 使session失效
    req.session.destroy(()=>{
        res.redirect("/")
    })
})

// app.get("/get-cookie",(req,res)=>{

//     // 给客户端发送一个cookie
//     res.cookie("username","admin")
//     res.send("cookie已经发送")
// })

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