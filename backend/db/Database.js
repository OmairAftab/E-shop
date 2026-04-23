const mongoose=require("mongoose")


const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL)
    .then((data) => {
        console.log("mongodb connected")
    })
}


module.exports=connectDatabase