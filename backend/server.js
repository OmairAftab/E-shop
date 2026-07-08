const app = require("./app");
const connectDatabase = require("./db/Database");

// config — load dotenv only in development (Render injects env vars directly in production)
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({
        path: "backend/config/.env"
    });
}

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server for uncaught exception");
    process.exit(1);
});

// connect to database
connectDatabase();

// start server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on Port: ${process.env.PORT || 8000}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server for unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});

app.get("/", (req, res) => {
    res.send("Backend is running!");
});