const {Product,User,Category} = require("../models/index")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name : process.env.cloud_name,
    api_key : process.env.Api_key,
    api_secret : process.env.Api_secret
})


class ProductController {
    static async addProducts(req,res,next){
        try {
            // console.log(req, "ini request");
            const {name,description,price,stock,imgUrl,categoryId} = req.body
            let data = await Product.create({
                name,
                description,
                price,
                stock,
                imgUrl,
                categoryId,
                authorId : req.user.id
            }) 
            const category = await Category.findByPk(categoryId)

            if (!category){
                res.status(404).json({message : "Not Found"})
            }
            res.status(201).json(data)
        } catch (error) {
          next(error)
        }
    }

    static async getProducts(req,res,next){
        try {
            // console.log(req), "<<<<<<<<<";
            let data = await Product.findAll({
                include :[{
                    model : User,
                    attributes  :{
                        exclude : ["password"]
                    }
                }]
            })
            if(!data){
                throw {name : "Not Found"}
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }


    static async getProductsById(req,res,next){
        try {
            const {id} = req.params
            let data = await Product.findByPk(id)
            if(!data){
                throw {name : "Not Found"}
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async updateProducts(req,res,next){
        try {
            const {id} = req.params
            const {name,description,price,stock,imgUrl,categoryId} = req.body
            let data = await Product.update({
                name,
                description,
                price,
                stock,
                imgUrl,
                categoryId,
            },
            {
                where : {
                    id
                },
                returning: true
            })
            const category = await Category.findByPk(categoryId)
            if(!category){
                throw {name : "Not Found"}
            }
            // console.log(data);
            if(!data){
                throw {name: "Not Found"}
            }
            
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            const {id} = req.params
            let data = await Product.findByPk(id)
            if(!data){
                throw {name: "Not Found"}
            }

            res.status(200).json({message: `${data.name} success to delete`})
            await Product.destroy({
                where : {
                    id
                }
            })
        } catch (error) {
            console.log(error, "Controller deleteeeee");
            next(error)
        }
    }

    static async uploadImage(req,res,next){
        try {
            const findProduct = await Product.findByPk(req.params.id);
            console.log(findProduct, "apa disini????");
            if(!findProduct) throw {name : "Not Found"}
            console.log(findProduct, "disini bukan ga nemunya??");

            if(!req.file) throw {name: "please provide a picture"};

            const base64Image = req.file.buffer.toString("base64")
            const base64Url = `data:${req.file.mimetype};base64,${base64Image}`;

            const cloudinaryResponse = await cloudinary.uploader.upload(base64Url);

            // console.log(cloudinaryResponse, "ini cloudinary response");

           let updateImg =  (await Product.update(
                {imgUrl : cloudinaryResponse.secure_url},
                {where : {id : req.params.id}, 
                    returning : true}
            ))[1][0];
            
            res.status(200).json({message: `Image ${updateImg.name} success to update`})
        } catch (error) {   q
            console.log(error, "di controller upload image");
            next(error)
        }
    }
 }


module.exports = ProductController