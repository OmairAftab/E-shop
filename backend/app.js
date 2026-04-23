const express=require ("express");
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser=require ("cookie-parser")
const bodyParser=require ("body-parser")
const fileUpload=require("express-fileupload")

const app=express();


app.use(express.json());                               // parses incoming JSON request bodies
app.use(cookieParser());                               // parses cookies from request headers
app.use(bodyParser.urlencoded({ extended: true }));    // parses form data (URL-encoded bodies)
app.use(fileUpload({ useTempFiles: true }));           // enables file uploads, saves to temp folder


//config
if (process.env.NODE_ENV !== "PRODUCTION") {          // only runs in development, not production
    require("dotenv").config({
        path: "backend/config/.env"                   // loads .env variables from this path
    })
}


// for handling errors. imported it from /utils/errorhandler
app.use(ErrorHandler)


module.exports=app;   // exports app to be used in server.js