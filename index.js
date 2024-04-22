// imports the modules
const express = require("express")
const cors = require('cors')
const bcrypt = require("bcryptjs")

// creates the express server
const app = express()
// specify port for app
const port = 8080
// specify salt variable for bcrypt
const salt = bcrypt.genSaltSync(10)

//middlewares
app.use(cors())
app.use(express.json())

app.get("/api/v1", (req, res)=>{
    res.json("Hello World")
})

app.post("/register", (req, res)=> {
    try{
        const {email, password} = req.body
        res.json({email, password: bcrypt.hashSync(password, salt)})
    } catch (e){
        console.log(e)
    }
})

app.listen(port , ()=>{
    console.log(`app listening on port ${port}`)
})