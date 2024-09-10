const request = require("supertest")
const app = require("../app")
const {sequelize,Product,User,Category} = require("../models")
const{signToken, } = require("../helpers/jwt")
// harus buat data di database testing terlebih dahulu supaya saat di test sudah ada datanya 
// saat ada permintaan testing nanti at least uda ada database di test
const admin = {
    username : "admin2",
    email : "admin2@mail.com",
    password : "12345",
    role: "admin",
}

const staff = {
    username : "staff5",
    email : "staff5@mail.com",
    password : "12345",
    role: "Staff",
}

const product = {
    name :"product1",
    description: "aokweoko",
    price: 123,
    stock: 10,
    imgUrl: "askdjwe",
    categoryId : 1,
    authorId : 1
}

let access_token
let faketoken ="aowkeoakeo2"
let staff_token 

//! beforeAll -> Create data terlebih dahulu supaya daatabase keisi yang nantinya akan dilakukan CRUD, jangan lupa tokennya juga buat admin dan staff
beforeAll(async () => {
    let newUser = await User.create(admin)
    let staffUser = await User.create(staff)
  
    await  Category.create({name : "Category 1"})
    await Product.create (product)

    access_token = signToken({id : newUser.id})
    staff_token = signToken({id :staffUser.id })
})

//!afterAll dilakukan untuk bersih2 database setelah dilakukan test CRUD, supaya saat mau npx lagi mulai dari kosong lagi databasenya

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Users",null,{
        restartIdentity : true,
        truncate : true,
        cascade : true
    }),
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

//! Describe untuk membungkus code , isinya method /route, function
//! test ("description", async function)
//! utk lakukan testnya liat dokumentasi supertest
//! const response = await request(app).method(/route).send(jika ada req.body).set(jika ada req headers)
//! expect (status,body) dari response .liat dokumentasi jest ()
describe("POST /products", () => {
    //A. Success Create (201)
    it("should be create new product and return 201", async () => {
        const response = await request(app)
            //nembak controller  
            .post("/products")
            //untuk ngirim body sesuai dengan controller
            .send(product)
            //untuk ngirim headers
            .set("Authorization", `Bearer ${access_token}`)

            console.log(response.body,"A");

            expect(response.status).toBe(201)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("id", expect.any(Number))
            expect(response.body).toHaveProperty("name", product.name)
            expect(response.body).toHaveProperty("description",product.description)
            expect(response.body).toHaveProperty("price",product.price)
            expect(response.body).toHaveProperty("stock",product.stock)
            expect(response.body).toHaveProperty("imgUrl",product.imgUrl)
            expect(response.body).toHaveProperty("categoryId",product.categoryId)
        })

    //B. Belum Login (401)
    it("should login first and return 401", async () => {
        const response = await request(app)
            .post("/products")
            .send(product)

            console.log(response.body, "B");
            //output : {message: "Invalid Token"}

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    //Invalid Token (401)
    it("should use the Right Token", async () => {
        const response = await request(app)
            .post("/products")
            .send(product)
            .set("Authorization", `Bearer ${faketoken}`)

            console.log(response.body, "C");
            //output : {message: "Invalid Token"}
        
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message","Invalid Token")
    })

    //Validation required (400)
    it("should have the right request body and return 400 ", async () => {
        const asd = {
            name : "",
            description : "",
            price : "",
            stock : "",
            imgUrl: "",
            categoryId : ""
        }
        const response = await request(app)
            .post("/products")
            .send(asd)
            .set("Authorization", `Bearer ${access_token}`)
            
            console.log(response.body, "D");
            
            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("message", expect.any(Array))
            expect(response.body.message).toContain("Name is required")
            expect(response.body.message).toContain("Description is required")
            expect(response.body.message).toContain("Price is required")
            expect(response.body.message).toContain("ImageUrl is required")
            expect(response.body.message).toContain("CategoryId is required")
        })
    })
 describe("GET /products",  () => {
        it("Success get products and return 200" , async () => {
            const response = await request(app)
            .get("/products")
            .set("Authorization", `Bearer ${access_token}`)
            
                console.log(response.body, "E-");
                
                expect(response.status).toBe(200)
                expect(response.body).toBeInstanceOf(Array)
                expect(response.body[0]).toHaveProperty("id", expect.any(Number))
                expect(response.body[0]).toHaveProperty("name", expect.any(String))
                expect(response.body[0]).toHaveProperty("description",expect.any(String))
                expect(response.body[0]).toHaveProperty("price", expect.any(Number))
                expect(response.body[0]).toHaveProperty("categoryId",expect.any(Number))
                expect(response.body[0]).toHaveProperty("stock",expect.any(Number))
                expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String))
                expect(response.body[0]).toHaveProperty("authorId", expect.any(Number))
                expect(response.body[0].User).toBeInstanceOf(Object)
            })
            
            it("Must login first and return 401", async ()=> {
                const response = await request(app)
                .get("/products")
                
                console.log(response.body, "F-");
                
                expect(response.status).toBe(401)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("message", "Invalid Token")
            })
            
            it("Token Invalid and return 401", async () => {
                const response = await request(app)
                .get("/products")
                .set("Authorization" , `Bearer ${faketoken}`)
                
                console.log(response.body, "G-");
                
                expect(response.status).toBe(401)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("message", "Invalid Token")
            })
        })
        
 describe("GET /products/:id", () => {
            it("Success find 1 Entity with Id given by params", async () => {
                const response = await request(app)
                .get("/products/1")
                .set("Authorization", `Bearer ${access_token}`)
                
                // console.log(response.body, "H-");
                
                expect(response.status).toBe(200)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("id", expect.any(Number))
                expect(response.body).toHaveProperty("name", expect.any(String))
                expect(response.body).toHaveProperty("description", expect.any(String))
                expect(response.body).toHaveProperty("price", expect.any(Number))
                expect(response.body).toHaveProperty("stock", expect.any(Number))
                expect(response.body).toHaveProperty("imgUrl", expect.any(String))
                expect(response.body).toHaveProperty("categoryId", expect.any(Number))
                expect(response.body).toHaveProperty("authorId", expect.any(Number))
            })
            
            it("User must login First", async () => {
                const response = await request(app)
                .get("/products/1")
                
                console.log(response.body, "I-");
                
                expect(response.status).toBe(401)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("message", "Invalid Token")
            })
            
            it("must use the right token" , async() => {
                const response = await request(app)
                .get("/products/1")
                .set("Authorization", `Bearer ${faketoken}`)
                
                console.log(response.body, "J-");
                
                expect(response.status).toBe(401)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("message", "Invalid Token")
            })
            
            it("Failed get products because id not found", async() => {
                const response = await request(app)
                .get("/products/100")
                .set("Authorization", `Bearer ${access_token}`)
                
                console.log(response.body, "K-");
                
                expect(response.status).toBe(404)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("message", "error not found")
            })
        })
            
describe("update /products/:id", () => {
                it("Succes update and return 200", async () => {
                const response = await request(app)
                    .put("/products/1")
                    .send(product)
                    .set("Authorization", `Bearer ${access_token}`)

                console.log(response.body, "L-");

                expect(response.status).toBe(200)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("id", expect.any(Number))
                expect(response.body).toHaveProperty("name", expect.any(String))
                expect(response.body).toHaveProperty("description", expect.any(String))
                expect(response.body).toHaveProperty("price", expect.any(Number))
                expect(response.body).toHaveProperty("stock", expect.any(Number))
                expect(response.body).toHaveProperty("imgUrl", expect.any(String))
                expect(response.body).toHaveProperty("categoryId", expect.any(Number))
                expect(response.body).toHaveProperty("authorId", expect.any(Number))
            })

            it("User must login First", async () => {
                const response = await request(app)
                    .put("/products/1")
                    .send(product)

                    console.log(response.body, "M-");
    
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("message", "Invalid Token")
            })

            it("must use the right token" , async() => {
                const response = await request(app)
                .put("/products/1")
                .set("Authorization", `Bearer ${faketoken}`)
                
                console.log(response.body, "N-");
                
                expect(response.status).toBe(401)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("message", "Invalid Token")
            })

            it("Failed get products because id not found", async() => {
                const response = await request(app)
                .put("/products/100")
                .set("Authorization", `Bearer ${access_token}`)
                
                console.log(response.body, "O-");
                
                expect(response.status).toBe(404)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("message", "error not found")
            })

            it("staff updates data that they did not create", async() => {
                const response = await request(app)
                .put("/products/1")
                .set("Authorization", `Bearer ${staff_token}`)

                console.log(response.body, "P-");

                expect(response.status).toBe(403)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty("message", "You have no access")
            })

     //Validation required (400)
         it("should have the right request body and return 400 ", async () => {
            const asd = {
                name : "",
                description : "",
                price : "",
                stock : "",
                imgUrl: "",
                categoryId : ""
            }
            const response = await request(app)
            .put("/products/1")
            .send(asd)
            .set("Authorization", `Bearer ${access_token}`)
            
            console.log(response.body, "Q-");
            
            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("message", expect.any(Array))
            expect(response.body.message).toContain("Name is required")
            expect(response.body.message).toContain("Description is required")
            expect(response.body.message).toContain("Price is required")
            expect(response.body.message).toContain("ImageUrl is required")
            expect(response.body.message).toContain("CategoryId is required")
        })
 })

 
 describe("Patch /products/:id" , () => {
    //  it("Success", async () => {
    //     const asd = {
    //         image : "qokweo",
    //     }
    //      const response = await request(app)
    //      .patch("/products/1")
    //      .send(asd)
    //      .set("Authorization",`Bearer ${access_token}`)
         
    //      expect(response.status).toBe(200)
    //      expect(response.body).toBeInstanceOf(Object)
    //      expect(response.body).toHaveProperty("message", expect.any(String))
    //     })
        
        it("belum login", async () => {
            const response = await request(app)
            .patch("/products/1")
            
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("message", "Invalid Token")
        })
        
        
        it("token gak valid", async () => {
        const response = await request(app)
        .patch("/products/1")
        .set("Authorization",`Bearer ${faketoken}`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    it("id tidak terdapat di database", async () => {
        const response = await request(app)
        .patch("/products/100")
        .set("Authorization",`Bearer ${access_token}`)
        
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "error not found")
    })
    
    it("staff patch data that they did not create", async() => {
        const response = await request(app)
        .patch("/products/2")
        .set("Authorization", `Bearer ${staff_token}`)
        
        console.log(response.body, "T-");
        
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "You have no access")
    })
 })


    describe("delete /products/:id", () => {
       it("success delete and return 200", async () => {
           const response = await request(app)
               .delete("/products/1")
               .set("Authorization", `Bearer ${access_token}`)
   
           expect(response.status).toBe(200)
           expect(response.body).toBeInstanceOf(Object)
           expect(response.body).toHaveProperty("message", expect.any(String))
       })
   
       it("User belum login", async () => {
           const response = await request(app)
               .delete("/products/1")
               
   
           expect(response.status).toBe(401)
           expect(response.body).toBeInstanceOf(Object)
           expect(response.body).toHaveProperty("message", "Invalid Token")
       })
   
       it("Token tidak dikenali", async () => {
           const response = await request(app)
               .delete("/products/1")
               .set("Authorization", `Bearer ${faketoken}`)
   
           expect(response.status).toBe(401)
           expect(response.body).toBeInstanceOf(Object)
           expect(response.body).toHaveProperty("message", "Invalid Token")
       })
   
       it("Product with Id not found", async () => {
           const response = await request(app)
               .delete("/products/100")
               .set("Authorization", `Bearer ${access_token}`)
   
           expect(response.status).toBe(404)
           expect(response.body).toBeInstanceOf(Object)
           expect(response.body).toHaveProperty("message", "error not found")
       })
   
       it("staff delete data that they did not create", async() => {
           const response = await request(app)
           .delete("/products/2")
           .set("Authorization", `Bearer ${staff_token}`)
   
           console.log(response.body, "T-");
   
           expect(response.status).toBe(403)
           expect(response.body).toBeInstanceOf(Object)
           expect(response.body).toHaveProperty("message", "You have no access")
       })
    })

    it("should have the right request body and return 500", async () => {
        const asd = {
            img : "woekqoqlkwlls",
        }
        const response = await request(app)
        .patch("/products/1")
        .send(asd)
        .set("Authorization", `Bearer ${staff_token}`)
        
        console.log(response.body, "Q-");
        
        expect(response.status).toBe(500)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Internal server error")
    })



    
 

