// imports the modules
const express = require("express")
const cors = require('cors')
const bcrypt = require("bcryptjs")
const mongoose = require('mongoose')
const User = require('./models/User')

// creates the express server
const app = express()
// specify port for app
const port = 8080
// specify salt variable for bcrypt
const salt = bcrypt.genSaltSync(10)

//middlewares
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://akunajoshua:6FtA0VORRARQxQkV@jblog.tkrnbrj.mongodb.net/?retryWrites=true&w=majority&appName=jblog')


app.post("/register", async (req, res)=> {
    try{
        const {username, password} = req.body
        const hash = bcrypt.hashSync(password, salt)
        const userInfo = await User.create({username, password:hash})
        res.json(userInfo)
    } catch (e){
        /*console.log(e)*/
        res.status(400).json("invalid username")
    }
})

app.post('/login', async (req, res)=>{
    const {username, password} = req.body
    const userInfo = await User.findOne({username})
    const isValidUser = bcrypt.compareSync(password, userInfo.password)
    res.json(isValidUser)
})

app.listen(port , ()=>{
    console.log(`app listening on port ${port}`)
})
