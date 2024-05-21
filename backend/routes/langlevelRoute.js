const express = require("express")
const router = express.Router()

const { getAllLanglvl } = require("../controllers/langlevelCtrl")


router.get("/", getAllLanglvl)


module.exports = router