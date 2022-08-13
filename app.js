const express = require('express');
require('dotenv').config()
const path = require('path')
const indexRouter = require("./modules/index.router")
const connectDB = require('./DB/connection')
const app = express();
const port = process.env.PORT
app.use(express.json())
connectDB()
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
app.use('/api/v1/auth', indexRouter.authRouter)
app.use('/api/v1/user', indexRouter.userRouter)
app.use('/api/v1/admin', indexRouter.adminRouter)
app.use('/api/v1/post', indexRouter.postRouter)
app.listen(port,()=>{
    console.log(`server is running on port :::: ${port}`);
})