const express = require("express")
const router = express.Router();
const multer = require('multer')
const fs = require('fs');
const { updateUniversity } = require("../Controllers/universityController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `./src/public/universityImages`
        fs.mkdirSync(path, { recursive: true })
        return cb(null, path)
    },
    filename: function (req, file, cb) {
        console.log(" up loop==>", file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        file?.fieldname === 'universityImage' ? req.body.universityImage = `/universityImages/` + uniqueSuffix + file.originalname : req.body.universityLogo = `/universityImages/` + uniqueSuffix + file.originalname;
        //req.body.universityImage =  + uniqueSuffix + file.originalname
        //req.body.universityLogo = `/universityImages/` + uniqueSuffix + file.originalname
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage })
router.route("/updateUniversity").put(upload.fields([{ name: 'universityImage', maxCount: 2 }, { name: 'universityLogo', maxCount: 2 }]), updateUniversity);

module.exports = router;