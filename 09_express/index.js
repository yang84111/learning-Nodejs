const express = require("express")
const path = require("node:path")
const app = express()

const STUDENT_ARR = [
    {
        name: "孙悟空",
        age: 18,
        gender: "男",
        address: "花果山",
    },
    {
        name: "猪八戒",
        age: 28,
        gender: "男",
        address: "高老庄",
    },
    {
        name: "沙和尚",
        age: 38,
        gender: "男",
        address: "流沙河",
    }
]

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
    //希望用户在访问students路由时，返回给用户一个学生信息的页面
    /* 
        html页面属于静态页面，想要网页跟随服务器数据的变化而变化
            这个在node中称为  模板
        
        在node中有很多模板引擎
        
        ejs是node中的一款模板引擎，使用步骤：
            1.安装ejs
            2.配置express的模板引擎为ejs
                app.set("view engine","ejs")
            3.配置模板路径
                app.set("views",path.resolve(__dirname,"views"))


            注意：模板引擎需要被express渲染后才能使用
    */

    // res.render() 用来渲染一个模板引擎，并将其返回给浏览器
    // 可以将一个对象作为render的第二个参数传递，这样在模板中可以访问到对象中的数据
    // res.render("students",{name:"孙悟空",age:18,gender:"男"})
    // <%= %>在ejs中输出内容时，她会自动对字符串中的特殊符号进行转译
    // 这个设计主要为了避免 xss攻击
    // <%- %>  直接将内容输出
    // <% %>   可以直接写JS代码
    // res.render("students",{hello:"<h1>hahaha</h1>"})
    for (let i = 0; i < STUDENT_ARR.length; i++) {
        res.render("students", {
            
        })
    }

})



// 可以在所有路由的后面配置错误路由
app.use((req, res) => {
    // 只要这个中间件一执行，说明上面的地址都不匹配
    res.status(404)
    res.send("<h1>网页被偷走辣~~~</h1>")
})


app.listen(3000, () => {
    console.log("服务器启动成功~~")
})