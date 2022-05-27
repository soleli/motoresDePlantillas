const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/'));
    },

    filename: (res, file, cb) => {

        const newFilename = Date.now() + '-' + file.originalname;

        cb(null, newFilename);

    }

})
const uploadFile = multer({ storage });

let productos = []


router.get('', (req, res) => {
    return res.send("hola")
})


module.exports = router;