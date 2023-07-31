/* 
    express是node中的服务器软件
        通过express可以快速的在node中搭建一个web服务器
    -使用步骤
        1.创建并初始化项目  yarn init -y
        2.安装express  yarn add express
        3.创建index.js  编写代码
*/

const express = require("express")

// 获取服务器的实例（对象）
const app = express()
/* 
    如果希望服务器可以正常访问，则还需要为服务器设置路由
        路由可以根据不同的请求方式和请求地址来处理用户的请求

        app.METHOD(...)
            METHOD  可以是get或者post...

    中间件
        -在express我们使用app.use定义一个中间件
            中间件作用和路由很像，用法也很像
            但是路由不区分请求的方式，只看路径

        -和路由的区别
            1.会匹配所有请求
            2.路径设置父目录
*/

// next() 是回调函数的第三个参数，它是一个函数，调用函数后，可以触发后续的中间件
// next() 不能再响应处理完毕（res）后调用
app.use("/", (req, res, next) => {
    console.log(("中间件收到请求1"))
    // res.send("通过中间件返回的响应1")
    next()
})

app.use("/", (req, res,next) => {
    console.log(("中间件收到请求2"))
    res.send("通过中间件返回的响应2")
})

// http://localhost:3000
// 路由的回调函数执行时，会接受到三个参数
// 第一个 request  第二个 response

// app.get("/", (req,res) => {
//     console.log("有人访问了")
//     // 在路由中应该做两件事
//     // 1.读取用户请求（request） 
//     // req 表示的是用户的请求信息，通过req可以获取用户传递的数据
//     // console.log(req.url)

//     // 2.根据用户的请求返回响应（response）
//     // res 表示服务器发送给客户端的响应信息，通过res向客户端返回数据
//     // sendStatus() 向客户端发送响应状态码
//     // res.sendStatus(404)
//     // status() 用来设置响应状态码，但是并不发送
//     // send() 用来设置响应状态码并且发送
//     // res.status(200)
//     res.send("请求")

// })

// 启动服务器
// app.listen(端口号)  用来启动服务器    服务器启动后便可以通过3000端口来访问了
// 协议名://IP地址:端口号/路径
// http://localhost:3000
// http://127.0.0.1:3000
app.listen(3000, () => {
    console.log("服务器已经启动")
})