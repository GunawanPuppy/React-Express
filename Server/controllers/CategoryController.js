const {Category} = require("../models/index")


class CategoryController {
    static async addCategories(req,res,next){
        try {
            const {name} = req.body
            let data = await Category.create({
                name,
            })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getCategories(req,res,next){
        try {
            let data = await Category.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async updateCategories(req,res,next){
        try {
            const {id} = req.params
            const{name} = req.body
            let data = (await Category.update({
                name,
            },
            {
                where : {
                    id
                },
                returning : true
            })
            )[1][0]
            // console.log(data);
          if(!data){
            throw {name : "Not Found"}
          }

          res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategories(req,res,next){
        try {
            const {id} = req.params
            let data = await Category.findByPk(id)
            console.log(data);
            if(!data){
                throw {name : "Not Found"}
            }

            res.status(200).json(`${data.name} success to delete`)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController