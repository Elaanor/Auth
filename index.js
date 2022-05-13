const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./router/authRouter")

app = express()
app.use(express.json())

app.use('auth', authRouter)

const start = async () => {
    try {
        await  mongoose.connect('mongodb+srv://admin:deneme123@cluster0.erlun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(3000, () => {
            console.log("server running...")
        })
    } catch (error) {
        console.log(error);
    }
}

start()

