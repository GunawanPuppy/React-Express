const router = require("express").Router()
const ProductController = require("../controllers/ProductController")

const multer = require("multer"); //middlewares body parser utk form-data
const authentication = require("../middlewares/authentication")
const {authStaffOrAdmin} = require("../middlewares/authorization")
const upload = multer({storage : multer.memoryStorage()}) //untuk menyimpan file di memory multer   



router.get("/",authentication,ProductController.getProducts)
router.post("/",authentication, ProductController.addProducts)

router.get("/:id",authentication, ProductController.getProductsById)
router.put("/:id",authentication, authStaffOrAdmin, ProductController.updateProducts)
router.delete("/:id",authentication, authStaffOrAdmin, ProductController.delete)
router.patch("/:id",authentication, authStaffOrAdmin, upload.single("image"/*nama key*/), ProductController.uploadImage)
// untuk akses bisa lakukan console.log(req.file) di controller uploadImage



module.exports = router