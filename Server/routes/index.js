const router  = require("express").Router()
const productRoute = require("./ProductRouter")
const categoryRoute = require("./CategoryRouter")
const UserController = require("../controllers/UserController")
const PublicController = require("../controllers/PublicController")
const authentication = require("../middlewares/authentication")
const {authorization} = require("../middlewares/authorization")





router.post("/add-user",authentication, authorization ,UserController.register)
router.post("/login",UserController.login)



router.use("/products",productRoute)
router.use("/categories", categoryRoute)

router.get("/pub", PublicController.getPublic)
router.get("/pub/:id",PublicController.getPublicById)




module.exports = router