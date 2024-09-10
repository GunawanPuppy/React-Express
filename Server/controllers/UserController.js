const { comparePassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwt")
const {User} = require("../models/index")


class UserController {
    static async register(req,res,next){
        try {
            const {email,password,phoneNumber,address} = req.body

            let data = await User.create({
                email,
                password,
                phoneNumber,
                address
            })

            res.status(201).json({
                id: data.id,
                email: data.email
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req,res,next){
        try {
            const {email, password} = req.body
            if(!email || !password) {
                throw {name: "Email/Password are required"}
            }
            
            //1 Check emailnya ada di database apa enggak?
            const findUser = await User.findOne({
                where : {
                    email,
                }
            })

            if(!findUser){
                throw {name :"UNAUTHORIZED"}
            }
            console.log(findUser,"ini find <<<<");
            //2 Check password valid/tidak?
            const compared = comparePassword(password,findUser.password)
            if (!compared){
                throw {name : "UNAUTHORIZED"}
            }
            

            //3 Generate Tokennya
            const access_token = createToken({
                id:findUser.id
            })

            res.status(200).json({id: findUser.id, role:findUser.role,access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports =  UserController