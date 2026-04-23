const multer=require("multer");

const storage=multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,"uploads/")                   //yahan hum ne folder ka path define kr diya
    },
    filename: function(req,file,cb){
        const uniqueSuffix= Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename=file.originalname.split(".")[0]
        cb(null,filename + "-" + uniqueSuffix + ".png")
    }
})

exports.upload=multer({storage:storage})