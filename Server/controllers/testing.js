// const request = require("supertest")
// const app = require("../app")
// const {sequelize,User,Category} = require("../models")
// const {createToken} = require("../helpers/jwt")

//describe untuk mengelompokkan saja 
//only jalanin 1 aja 
//skip buat ngeskip 1test
// pake --runInBand buat ngurutin test dari atas --forceExit 
// bisa pake .send buat ngirim data, untuk naroh token bisa pake .set("Authorization", "Bearer" + token) nembak Routing pake .methodnya

//before all untuk seeding 
// beforeAll(async () => {
//     try {
//         await sequelize.queryInterface.bulkInsert("Products",null, {} )
//     } catch (error) {
        
//     }
// })
// test("success get /products", async () => {
//     const response = await request(app).get("/products");

//     const {body, status} = response

//     expect(status).toBe(200)
//     expect(body).toBeInstanceOf(Array)
//     expect(body[0]).toBeInstanceOf(Object)
//     expect(body[0]).toHaveProperty("name", expect.any(String))
// })


// test("success post /movies", async() => {
//     const response = await request(app).post("/products")

//     const {body , status} = response;

//     expect(status).toBe(201)
//     expect(body).toBeInstanceOf(Object);
//     expect(body).toHaveProperty("id", 2);
//     expect(body).toHaveProperty("name",expect.any(String))
// })

//clean up database => balik lagi ke state yang kita inginkan
// afterAll (async () => {
//    try {
//     await sequelize.queryInterface.bulkDelete("products",null, {
//         truncate : true,
//         cascade: true,
//         restartIdentity : true
//     })
// } catch (error) {
    
// } 
// })