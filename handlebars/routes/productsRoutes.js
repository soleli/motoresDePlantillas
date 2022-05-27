const express = require('express')
const router = express.Router();
const multer= require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req ,file, cb)=>{
        cb(null, path.join(__dirname, '../../public/images/'));
    },
    
    filename: (res,file,cb)=>{
    
        const newFilename = Date.now() + '-' +  file.originalname;
    
        cb(null,newFilename);
    
    }
    
    })
const uploadFile = multer({storage});

let productos = []

/* router.get('', (req, res) => {
  return res.json(productos)
}) */
router.get('', (req, res) => {
    return res.render("formProduct.html")
  })

router.get("/:id", (req, res) => {
  id = req.params.id;
  let productToId = productos.find(product => product.id == id);
  if (productToId) {
    return res.json(productToId)
  }
  else {
    return res.json({ 'error': 'Producto no encontrado' })

  }

})

router.post('', uploadFile.single('image'), (req, res) => {

    let newProduct = {
      id: productos.length + 1,
      ...req.body,
      image: req.file.filename
    };
    productos.push(newProduct);
  

 

  return res.status(201).json(newProduct)
})

router.put('/:id', (req, res) => {
  id = req.params.id;
  let productToEdit = productos.find(product => product.id == id)
  if (productToEdit) {
    productToEdit = {
      id: productToEdit.id,
      ...req.body,
    }

    let newProducts = productos.map(product => {
      if (product.id == productToEdit.id) {
        return product = { ...productToEdit };
      }
      return product;
    })


    return res.json(newProducts)
  }
  else {
    return res.json({ 'error': 'Producto no encontrado' })
  }


})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let finalProducts = productos.filter(product => product.id != id);
  return res.json(finalProducts)
})

module.exports = router;