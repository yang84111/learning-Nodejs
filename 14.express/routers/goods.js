const express = require("express")

// 创建一个router对象
const Router = express.Router()

Router.get("/hello",(req,res)=>{
    res.send("hello woshi hello")
})

// 将router暴露到模块外
module.exports = Router