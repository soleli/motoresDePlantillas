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
    return res.render("formProduct")
})
router.post('', uploadFile.single('image'), (req, res) => {

    let newProduct = {
        id: productos.length + 1,
        ...req.body,
        image: req.file.filename
    };
    productos.push(newProduct);


    return res.render("listProduct", { productos })
})

router.get('/products', (req, res) => {
    if (productos.length>0)
        return res.render("listProduct", {"productos":productos })
    else
        return res.render("listProduct", { msg: "No hay productos cargados" })
})

module.exports = router;