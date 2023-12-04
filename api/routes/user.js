const express= require("express")

const updateController = require("../controllers/user")
const verifyToken = require("../utils/verifyUser")

const router = express.Router()

router.get("/",updateController.test)
router.post("/update/:id", verifyToken,updateController.updateUser);

module.exports = router