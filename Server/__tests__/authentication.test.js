const request = require("supertest") // buat ngambil supertest
const app = require("../app") // buat ngambilapp 
const {sequelize , User} = require("../models")
const {createToken} = require("../helpers/jwt")

/* ---RULES OF TESTING
    1. tiap unit test tidak boleh dependant satu sama lain
    2. data2 yang dibutuhkan kalo misal terjadi hal yang tadi
    3. tidak boleh membuat orang yang nge run test menjadi repot 
    4. Ketika test DB nya harus fresh from the oven dan ketika kelar test DB harus dibersihkan
    --- LifeCycle
    1. "beforeAll" = jalan ketika sebelum semua test di jalankan 1x
    2. "beforeEAch" = jalan sebelum per unit test
    3. "afterAll" = jalan ketika semua Test selesai dijalankan
    4. "afterEach" = jalan ketika setelah per unit test
*/


const admin = {
    username : "admin2",
    email : "admin2@mail.com",
    password : "12345",
    role: "admin",
}

let access_token
let fake_token = "asljdpoqwdpdlknkxln"

beforeAll ( () => {
    //seeding 1 user setidaknya supaya test login berhasil
    //Buat access token sebelum test jalan karena saat test tidak boleh hardcode
    const newUser =  User.create(admin)

    access_token = createToken({id : newUser.id})
})

afterAll( () => {
    //buat bersih2 database
     sequelize.queryInterface.bulkDelete("Users",null,{
        restartIdentity : true,
        truncate: true,
        cascade: true
    })
})

//buat ngetest 1 doang kasih test.only

describe("POST /login", ()=> {
    //1. Success (200)
    it("Success Login", async () => {
        const account = {
            email : admin.email,
            password: admin.password
        }

        const response = await request(app)
            .post("/login")
            .send(account)
        // console.log(response, "ini response");
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("access_token", expect.any(String))
    })

    //2. 400 (Empty Email)
    it("Empty Email", async () => {
        const emptyEmail = {
            email : "",
            password: admin.password
        }

        const response = await request(app)
            .post("/login")
            .send(emptyEmail)

            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("message","email/password cannot be empty" )
    })
    //3. 400(Empty Password)
    it("Empty Password", async () => {
        const emptyPass = {
            email : admin.email,
            password: ""
        }

        const response = await request(app)
            .post("/login")
            .send(emptyPass)

            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("message","email/password cannot be empty" )
    })
    // 4. Invalid Email (401)
    it("Invalid Email", async () => {
        const invalidEmail = {
            email : "wew@mail.com",
            password: admin.password
        }

        const response = await request(app)
            .post("/login")
            .send(invalidEmail)

            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("message","Invalid email/password" )
    })
    //5. Invalid Password (401)
    it("Invalid Password", async () => {
        const invalidPass = {
            email : admin.email,
            password: "91028309"
        }

        const response = await request(app)
            .post("/login")
            .send(invalidPass)

            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty("message","Invalid email/password" )
    })
})


describe("Post /add-user", () => {
    // A. Success Add User (201)
    it("Register user", async () => {
        const newUser = {
            username: "botak",
            email: "botak@mail.com",
            password: "12345",
        }

        const response = await request(app)
            .post("/add-user")
            .send(newUser)
            .set("Authorization", `Bearer ${access_token}`)

        // console.log(response.body, "Regist-A")
        // output:  { id: 2, email:botak@mail.com }

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id",expect.any(Number))
        expect(response.body).toHaveProperty("email",newUser.email)
    })

    // B. Email null ()
    it("Email null", async () => {
        const newUser = {
            username: "botak",
            password: "12345",
        }

        const response = await request(app)
            .post("/add-user")
            .send(newUser)
            .set("Authorization", `Bearer ${access_token}`)

        // console.log(response.body, "Regist-B")
        // message: ["Email cannot be null"]

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", expect.any(Array))
    })

    // C. Password null ()
    it("Password null", async () => {
        const newUser = {
            username: "botak",
            email: "botak@mail.com"
        }

        const response = await request(app)
            .post("/add-user")
            .send(newUser)
            .set("Authorization", `Bearer ${access_token}`)

        // console.log(response.body, "Regist-C")
    

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", expect.any(Array))
    })



     // D. Email Empty ()
     it("Empty Email", async () => {
        const newUser = {
            username: "botak",
            email: "",
            password: "12345",
        }

        const response = await request(app)
            .post("/add-user")
            .send(newUser)
            .set("Authorization", `Bearer ${access_token}`)

        // console.log(response.body, "Regist-D")
    

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", expect.any(Array))
    })

    // E. Empty Password ()
    it("Empty Password", async () => {
        const newUser = {
            username: "botak",
            email: "botak@mail.com",
            password: "",
        }

        const response = await request(app)
            .post("/add-user")
            .send(newUser)
            .set("Authorization", `Bearer ${access_token}`)

        // console.log(response.body, "Regist-E")
    

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message",expect.any(Array))
    })

    // F. Email has been registered ()
    it("Email has been registered", async () => {
        const newUser = {
            username: admin.username,
            email: admin.email,
            password: admin.password,
        }

        const response = await request(app)
            .post("/add-user")
            .send(newUser)
            .set("Authorization", `Bearer ${access_token}`)

        // console.log(response.body, "Regist-F")
    

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message",expect.any(Array))
    })
    
    //G Format Email salah/Invalid
    it("Email has been registered", async () => {
        const newUser = {
            username: admin.username,
            email: "palegundul",
            password: admin.password,
        }

        const response = await request(app)
            .post("/add-user")
            .send(newUser)
            .set("Authorization", `Bearer ${access_token}`)

        // console.log(response.body, "Regist-G")
    

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message",expect.any(Array))
    })
    //H. No access_token
    it("No access token", async () => {
        const newUser = {
            username: admin.username,
            email: admin.email,
            password: admin.password,
        }

        const response = await request(app)
            .post("/add-user")
            .send(newUser)

        // console.log(response.body, "Regist-H")
    

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message",expect.any(String))
    })

    //i . Invalid token
    it("Invalid Token", async () => {
        const newUser = {
            username: admin.username,
            email: admin.email,
            password: admin.password,
        }

        const response = await request(app)
            .post("/add-user")
            .send(newUser)
            .set("Authorization", `Bearer ${fake_token}`)

        // console.log(response.body, "Regist-I")
    

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message",expect.any(String))
    })
})