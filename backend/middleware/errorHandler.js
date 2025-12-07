const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    //mongoose bad ObjectId
    if(err.name == 'CastError'){
        statusCode = 400;
        message = `Resource not found. Invalid: ${err.path}`;
    }

    //mongoose duplicate key error
    if(err.code == 11000){
        const field = Object.keys(err.keyValue);
        statusCode = 400;
        message = `Duplicate ${field} entered`;
    } 

    //mongoose validation error
    if(err.name == 'ValidationError'){
        statusCode = 400;
        message = Object.values(err.errors).map(value => value.message).join(', ');
    }

    //multer file upload error
    if(err.name == 'LIMIT_FILE_SIZE'){
        statusCode = 400;
        message = 'file size is too large. Maximum size allowed is 10MB';
    }

    //JWT error
    if(err.name == 'JsonWebTokenError'){
        statusCode = 401;
        message = 'JSON Web Token is invalid. Try again';
    }
    
    //JWT expire error
    if(err.name == 'TokenExpiredError'){
        statusCode = 401;
        message = 'JSON Web Token is expired. Try again';
    }
    console.error('error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })

    res.status(statusCode).json({
        success: false,
        error: message,
        statusCode,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

export default errorHandler;