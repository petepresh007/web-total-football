const express = require("express");
const router = express.Router();
const auth = require("../middleware/AUT");
const upload = require("../multer");

const {
    createFootball,
    getAllFootball,
    getSingleFootball,
    adminDeleteFootball,
    adminUpdateFootball
} = require("../controllers/football");

router.post("/create", auth, upload.array("file"), createFootball);
router.get("/allfootball", getAllFootball);
router.get("/allfootball/:footballID", getSingleFootball);
router.delete("/allfootball/:footballID", auth, adminDeleteFootball);
router.patch("/allfootball/:footballID", auth, adminUpdateFootball)

module.exports = router