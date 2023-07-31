const { rejects } = require("node:assert")
const fs = require("node:fs/promises")
const path = require("node:path")
/* 
    fs.readFile()  读取文件
    fs.appendFile()  创建新文件，或将数据添加到已有文件中
    fs.mkdir()  创建新目录
    fs.rmdir()  删除目录
    fs.rm()   删除文件
    fs.rename()  重命名
    fs.copyFile()  复制文件
*/

// fs.appendFile(
//     path.resolve(__dirname, "./hello.txt"),
//     "今天天气真不错"
// ).then(r => {
//     console.log("添加成功")
// })


