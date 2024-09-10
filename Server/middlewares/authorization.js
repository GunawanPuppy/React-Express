const {Product} = require("../models/index")

async function authorization(req,res,next){
    try {
        if(req.user.role !== "admin"){
            throw {name : "Forbidden Access"}
        }
        next()
    } catch (error) {
        next(error)
    }
}

async function authStaffOrAdmin(req,res,next){
    try {
        if(req.user.role === "admin"){
            return next()
        }else {
            //jika bukan admin ambil id dari params
            const {id} = req.params
            //find barang by id dari req.params
            const findProduct = await Product.findByPk(id)
            if(!findProduct){
                throw {name : "error not found"}
            }
            //cek user id barangnya sama gak dengan yang login
            if(req.user.id == findProduct.authorId){
                return next()
            } else {
                throw {name : "Forbidden Access"}
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {authorization,authStaffOrAdmin}