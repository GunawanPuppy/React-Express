const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController")
const authentication = require("../middlewares/authentication")

router.post("/",authentication, CategoryController.addCategories)
router.get("/", CategoryController.getCategories)
router.put("/:id", authentication, CategoryController.updateCategories)
router.delete("/:id", authentication,CategoryController.deleteCategories)

module.exports = router