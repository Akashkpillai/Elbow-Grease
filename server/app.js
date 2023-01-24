const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/connect')
const cors = require('cors')
const cookiParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const expertRouter = require('./routes/expertRouter')
const bodyParser = require('body-parser');

app.use(cors())
//Router
app.get('/',(req,res)=>{
    res.json({msg:"Hello World"});
})

//MiddleWare
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(cookiParser())
app.use(fileUpload({
    useTempFiles:true
}))
app.use('/users',userRouter)
app.use('/admin',adminRouter)
app.use('/expert',expertRouter)


//Port
const PORT = process.env.PORT || 5500
//Database
const connectServer = async() =>{
    try {
        await connectDB();
        const PORT = process.env.PORT || 3500
        app.listen(PORT,()=>{
            console.log(`The Server is running on port ${PORT}`);
        }) 
    } catch (error) {
        console.log(error);
    }
}

connectServer();