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


// import user routes
const user=require("./controller/user.js")
// mount routes
app.use("/user", user)


// import shop routes
const shop=require("./controller/shop.js")
// mount routes
app.use("/shop", shop)


//import product routes
const product=require("./controller/product.js")
    //mount routes
app.use("/product", product)


//import event routes
const event=require("./controller/event.js")
//mount routes
app.use("/event", event)


const couponCode=require("./controller/couponCode.js")
app.use("/coupon", couponCode)

//import order routes
const order=require("./controller/order.js")
//mount routes
app.use("/order", order)

//import conversation routes
const conversation=require("./controller/conversation.js")
app.use("/conversation", conversation)

const message=require("./controller/message.js")
app.use("/message", message)



// for handling errors - use the error middleware
app.use(errorMiddleware)

module.exports=app;   // exports app to be used in server.js