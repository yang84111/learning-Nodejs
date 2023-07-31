const express = require("express")

// 创建一个router对象
const Router = express.Router()

Router.get("/list",(req,res)=>{
    res.send("hello woshi list")
})

// 将router暴露到模块外
module.exports= Router