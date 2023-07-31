const express = require("express")
const { log } = require("node:console")
const path = require("node:path")

const app = express()

/* 
    实现修改代码后自动重启服务器，安装模块 nodemon
        使用方式：
            1.全局安装
                npm i nodemon -g
                yarn global add nodemon
                    -通过yarn进行全局安装时，默认yarn的目录并不在环境变量中
                    -需要手动添加到环境变量中
                -启动
                    nodemon  运行index.js
                    nodemon xxx   运行指定的js 
                
            2.在项目中安装
                npm i nodemon -D
                yarn add nodemon -D 

                启动：
                    npx nodemon
                    
*/

// use() 中间件
/* 
    服务器中代码，对于外部来说都是不可见得，html页面浏览器无法直接访问
        如果希望他可以访问，则需要将页面所在的目录设置为静态资源目录
*/
// 设置static中间件后，浏览器访问时会自动去public目录下寻找是否有匹配的资源
app.use(express.static(path.resolve(__dirname, "./public")))

app.get("/", (req, res) => {
    res.send("怎么办呢？？？")
})

app.get("/login", (req, res) => {
    // 获取到用户输入的用户名和密码
    // req.query 表示查询字符串中的请求参数
    if (req.query.username === "sunwukong" && req.query.password === "123456") {
        res.send("登陆成功!")
    } else {
        res.send("用户名或密码错误！")
    }
    console.log("请求已经收到")
})

app.listen(3000, () => {
    console.log("服务器已经启动")
})