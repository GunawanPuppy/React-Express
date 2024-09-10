const {Product,Category} = require("../models/index")
const {Op} =require("sequelize")

class PublicController {
    static async getPublic(req,res,next){
        try {
            const { search, sort, page, filter } = req.query

            let option = {
                include : {
                    model: Category
                },
                where : {}
            }
            //Search by name
            if(search){
                option.where.name = {
                    [Op.iLike] : `%${search}%`
                }  
            }
            //Filter by categoryId filter sama search ini mirip caranya 
            if(filter) {
                option.where.categoryId = filter
            }

            //Sorting
            if(sort){
                //pas mau ngetest masukkin sort = - artinya descending kalo ngga ya otomatis ascending
                //jika - maka Descending jika bukan maka ascending. Index 0 awal setelah kata sort=
                const ordering = sort[0] === '-' ? 'DESC' : 'ASC'; 
                //jika descending, nah kalo descending dia motong dari -nya , jadi langsung liat sort by name atau apa??
                const columnName = ordering === 'DESC' ? sort.slice(1) : sort;
                //ini cara ngesortnya pake namanya option order
                //kalo normal kayak ngisi order : [[name,"DESC"]] name ini =columnName sedangkan "DESC" = ordering
                option.order = [ 
                    [columnName,ordering]
                ]
            }

            //pagination
            let limit = 10
            let pageNumber = 1
            
            //ambil 1 page 10 data berarti limit nya = 10
            //page 1 -> ambil data dari baris 1-10 -> offset = 0 limit = 10
            //page 2 -> 11-20 -> offset = 10 limit = 10 begitupun seterusnya
            //coba sendiri page.size mau berapa dan page.number mau brp
            if(page){
                //akses pakai[]
                if(page.size){
                    limit = page.size
                    option.limit = limit
                }
                //akses pakai[]
                if(page.number){
                    pageNumber = page.number
                    option.offset = limit * (pageNumber - 1)
                }
            }

            
            let {count,rows} = await Product.findAndCountAll(option)
            res.status(200).json({
                currentPage: +pageNumber,
                data: rows,
                totalData: count,
                totalPage: Math.ceil(count/limit),
                dataPerPage : +limit
            })
            console.log(req.query);
        } catch (error) {
            console.log(error, "ini di public");
            next(error)
        }
    }

    static async getPublicById(req,res,next){
        try {
            const{id} = req.params
            let data = await Product.findByPk(id)

            if(!data){
                throw {name : "Not Found"}
            }

            res.status(200).json(data)
        } catch (error) {
            console.log(error, "public id");
            next(error)
        }
    }
}

module.exports = PublicController