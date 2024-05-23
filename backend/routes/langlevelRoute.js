const express = require("express")
const router = express.Router()

const { getAllLanglvl } = require("../controllers/langlevelCtrl")

// the only route, did it like this so that it's 
// easier to add more routes in the future if necessary
router.get("/", getAllLanglvl)


module.exports = router