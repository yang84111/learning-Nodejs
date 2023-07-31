const express = require("express")
const path = require("path")
const app = express()

const cookieParser = require("cookie-parser")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
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

app.use("/students", require("./Router/students"))

app.use((req, res) => {
    res.status(404)
    res.send("页面不见了~~~")
})
app.listen(3000, (req, res) => {
    console.log("启动成功~~~")
})