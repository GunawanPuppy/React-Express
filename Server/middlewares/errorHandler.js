function errorHandler(error,req,res,next){
    console.log(error, "ini error di handler");
        let code = 500
        let message = "Internal server error"

        switch (error.name) {
                case "SequelizeValidationError":
                case "SequelizeUniqueConstraintError":
                    code = 400
                    message = error.errors.map(el =>el.message)
                break;
                case "Email/Password are required":
                    code = 400
                    message = "email/password cannot be empty"
                break;
                case "please provide a picture":
                        code = 400
                        message = "please provide a picture"
                break;
                case "UNAUTHORIZED":
                    code = 401
                    message = "Invalid email/password"
                break;
                case "JsonWebTokenError":
                case "Invalid Token":
                    code = 401
                    message = "Invalid Token"
                break;
                case "Forbidden Access":
                    code = 403
                    message = "You have no access"
                break;
                case "Not Found":
                    code = 404
                    message = "error not found"
                break;
        
            default:
                break;
        }
    res.status(code).json({message})
}

module.exports = errorHandler