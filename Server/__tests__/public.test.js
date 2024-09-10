const request = require("supertest")
const app = require("../app")
const {sequelize,Product,User,Category} = require("../models")

const product = {
    name :"product1",
    description: "aokweoko",
    price: 123,
    stock: 10,
    imgUrl: "askdjwe",
    categoryId : 1,
    authorId : 1
}

//! beforeAll -> Create data terlebih dahulu supaya daatabase keisi yang nantinya akan dilakukan CRUD, jangan lupa tokennya juga buat admin dan staff
beforeAll(async () => {
    await  Category.create({name : "Category 1"})
    await Product.create (product)

})

afterAll(async ()=> {
    await sequelize.queryInterface.bulkDelete("Categories",null,{
        restartIdentity: true,
        truncate : true,
        cascade : true
    })
    await sequelize.queryInterface.bulkDelete("Products",null,{
        restartIdentity : true,
        truncate : true,
        cascade: true
    })
})


describe("GET /products/pub", () => {
    it("Sucess Get PublicPage", async () => {
        const response = await request(app)
            .get("/pub")

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("currentPage",expect.any(Number))
            expect(response.body).toHaveProperty("data",expect.any(Array))
            expect(response.body).toHaveProperty("totalData",expect.any(Number))
            expect(response.body).toHaveProperty("totalPage",expect.any(Number))
            expect(response.body).toHaveProperty("dataPerPage",expect.any(Number))
            // expect(response.body.data[0]).toHaveProperty("id",expect.any(Number))
            // expect(response.body.data[0]).toHaveProperty("name",expect.any(String))
            // expect(response.body.data[0]).toHaveProperty("description",expect.any(String))
            // expect(response.body.data[0]).toHaveProperty("price",expect.any(Number))
            // expect(response.body.data[0]).toHaveProperty("stock",expect.any(Number))
            // expect(response.body.data[0]).toHaveProperty("imgUrl",expect.any(String))
            // expect(response.body.data[0]).toHaveProperty("categoryId",expect.any(Number))
            // expect(response.body.data[0]).toHaveProperty("authorId",expect.any(Number))
            // expect(response.body.data[0]).toHaveProperty("Category",expect.any(Object))
    })

    it("Success Get By Id", async() => {
        const response = await request(app)
            .get("/pub/1")

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("id",expect.any(Number))
            expect(response.body).toHaveProperty("name",expect.any(String))
            expect(response.body).toHaveProperty("description",expect.any(String))
            expect(response.body).toHaveProperty("price",expect.any(Number))
            expect(response.body).toHaveProperty("stock",expect.any(Number))
            expect(response.body).toHaveProperty("imgUrl",expect.any(String))
            expect(response.body).toHaveProperty("categoryId",expect.any(Number))
            expect(response.body).toHaveProperty("authorId",expect.any(Number))

    })
})