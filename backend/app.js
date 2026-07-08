const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://e-shop-nu-jet.vercel.app",
        "https://e-shop-dtqcx1n06-mohammad-omair-aftabs-projects.vercel.app",
        "https://e-shop-git-master-mohammad-omair-aftabs-projects.vercel.app",
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// config — only load dotenv in development (Render injects env vars directly in production)
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({
        path: "backend/config/.env"
    });
}

// user routes
const user = require("./controller/user.js");
app.use("/user", user);

// shop routes
const shop = require("./controller/shop.js");
app.use("/shop", shop);

// product routes
const product = require("./controller/product.js");
app.use("/product", product);

// event routes
const event = require("./controller/event.js");
app.use("/event", event);

// coupon routes
const couponCode = require("./controller/couponCode.js");
app.use("/coupon", couponCode);

// order routes
const order = require("./controller/order.js");
app.use("/order", order);

// conversation routes
const conversation = require("./controller/conversation.js");
app.use("/conversation", conversation);

// message routes
const message = require("./controller/message.js");
app.use("/message", message);

// root route — confirms backend is running
app.get("/", (req, res) => {
    res.send("E-shop backend is running!");
});

// error handling middleware
app.use(errorMiddleware);

module.exports = app;