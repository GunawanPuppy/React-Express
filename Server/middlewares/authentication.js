const{User} = require("../models/index")
const{verifyToken} = require("../helpers/jwt")

async function authentication (req,res,next){
    try {
        // console.log("masuk autentikasi");
        //1. Ada tokennya apa engga? 
        if(!req.headers.authorization){
            throw {name : "Invalid Token"}
        }

        //2. kita ambil token dan tipenya (Bearer "eyjssjasjdkwe")
        const token = req.headers.authorization.split(" ")[1]
        // console.log(token,"ini token");
        //3. Verifikasi token id nya berapa
        const payload = verifyToken(token)
        // console.log(payload , "ini verifikasi");
        //4. Cari user dengan id verifikasi tersebut
        const findUser = await User.findByPk(payload.id)
        // console.log(findUser, "ada usernya");
        if(!findUser){
            throw {name: "Invalid Token"}
        }
         //kalo ada 
        req.user = {
            id:payload.id,
            role: findUser.role,
            
        }

        next()
    } catch (error) {
        console.log(error);
       next(error)
    }
}

module.exports = authentication