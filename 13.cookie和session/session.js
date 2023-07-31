const express = require("express")
const path = require("node:path")
const fs = require("node:fs/promises")
const app = express()

const cookieParser = require("cookie-parser")
// 引入session
const session = require("express-session")
const { log } = require("node:console")

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

// 设置session中间件
app.use(session({
    secret:"hello"
}))

app.use(cookieParser())

app.get("/set", (req, res) => {
    /* 
        cookie的不足：
            -cookie是由服务器创建，浏览器保存
                每次浏览器访问服务器时都需要将cookie发回
                导致我们在cookie中不能存放较多的数据
                并且cookie是直接存储在客户端的，容易被篡改盗用
            -使用cookie一定不会在cookie中存储敏感信息                

        session
            -session是服务器中的一个对象，这个对象用来存储用户的数据
            -每一个session对象都有一个唯一的id，id会通过cookie的形式发送给客户端
            -客户端每次访问时只需要将存储有id的cookie发回即可获取他在服务器中存储的数据
            -在express中通过express-session组件来实现
                1.安装  yarn add express-session
                2.引入  const session = require("...")
                3.设置为中间件  app.use(session({...}))
    */
    // console.log(req.session)
    req.session.username = "sunwukong"
    res.send("查看session")
})
app.get("/get",(req,res)=>{
    
    const username = req.session.username
    console.log(username)
    res.send("读取session")
})

app.get("/delete-cookie",(req,res)=>{
    res.cookie("name","",{
        maxAge:0
    })
    res.send("删除cookie")
})


app.use((req, res) => {
    res.status(404)
    res.send("页面不见了~~~")
})
app.listen(3000, () => {
    console.log("启动成功")
})