const express = require("express");
const app = express();
const mongoose =require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv")
const ProductRoute = require("./Routes/product")
const cookieParser =require("cookie-parser")
const LoginRoute = require("./Routes/User")
const authenticate = require("./middleware/middleware")
const RoleRoute = require("./middleware/admin")

app.use(cors());
app.use(express.json());
dotenv.config();
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());


app.listen(5000,()=>{
    console.log("Server Is Running")
})

mongoose.connect(process.env.URL).then((res)=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
})

app.use("/api/Product",ProductRoute);
app.use("/api/admin",RoleRoute);
app.use("/api/login",LoginRoute);
app.get('/api/auth', authenticate, (req, res)=>{})