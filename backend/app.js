const express=require ("express");
const errorMiddleware = require("./middleware/error")
const cookieParser=require ("cookie-parser")
const bodyParser=require ("body-parser")
const cors = require("cors")  

const app=express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json());                               // parses incoming JSON request bodies
app.use(cookieParser());                               // parses cookies from request headers
app.use(bodyParser.urlencoded({ extended: true }));    // parses form data (URL-encoded bodies)

app.use("/uploads", express.static("uploads"))              // Serve uploaded files from /uploads instead of root


//config
if (process.env.NODE_ENV !== "PRODUCTION") {          // only runs in development, not production
    require("dotenv").config({
        path: "backend/config/.env"                   // loads .env variables from this path
    })
}


// import routes
const user=require("./controller/user.js")
// mount routes
app.use("/user", user)

// for handling errors - use the error middleware
app.use(errorMiddleware)

module.exports=app;   // exports app to be used in server.js