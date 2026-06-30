const express=require("express")
require("dotenv").config()
const cors =require("cors")
const {connectDB}=require("./config/db")
require("./models/taskModels")
require("./models/userModels")
const app=express()
const port = process.env.PORT || 3000
const taskRoutes = require("./routes/taskRoutes")
const userRoute = require("./routes/userRoute")
const assigntaskRoute=require("./routes/assigntaskRoute")



app.use(express.json())
app.use(cors({
     origin: "http://localhost:5173",
    credentials: true
}))
app.use('/task',taskRoutes)
app.use('/user',userRoute)
app.use('/assign-task',assigntaskRoute)


app.get('/', (req,res)=>res.send("Hello World"))
app.listen(port,()=> console.log("Server is running on port " + port))