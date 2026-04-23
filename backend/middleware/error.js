const ErrorHandler=require ("../utils/ErrorHandler")



module.exports=(err,req,res,next)=>{
    err.statusCode= err.statusCode || 500
    err.message = err.message || "Internal Server error"


    // wrong mongodb id error
    if(err.name==="CastError"){
        const message= `Resources not fount with this id. Invalid ${err.path}`
        err=new ErrorHandler(message,400)
    }




    //duplicate key error
    if(err.code===11000){
        const message= 'Duplicate key error';
        err=new ErrorHandler(message,400)
    }



    // wrong jwt error
    if(err.name==='JsonWebTokenError'){
        const message= `Your url is invalid please try again later`
        err= new ErrorHandler(message,400)
    }



    // jwt expired
    if(err.name==="TokenExpiredError"){
        const message= "Your URL is expired mean jwt is expired. Try again later"
    }






    res.status(err.statusCode).json({
        success:false,
        message=err.message
    })
}