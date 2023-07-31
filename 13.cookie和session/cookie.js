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

app.get("/set", (req, res) => {
    /* 
        cookie是由有效期的
            -默认情况下cookie的有效期就是一次会话（session）

            -maxAge用来设置cookie有效时间，单位毫秒
    */
    res.cookie("name","sunwukong",{
        // maxAge:1000 * 60 * 60 * 24 * 30  // 一个月
    })
    res.send("设置cookie")
})
app.get("/get",(req,res)=>{

    const name = req.cookies.name

    console.log(name)

    res.send("读取cookie")
})

app.get("/delete-cookie",(req,res)=>{
    // cookie 一旦发送给浏览器就不能再修改了
    // 但是我们可以通过发送新的同名cookie来替换旧的cookie
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