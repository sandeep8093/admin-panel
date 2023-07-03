const Product = require("../models/Product");
const {
    verifyToken,
    verifyTokenAndAdmin
  } = require("../middleware");

const router = require("express").Router();

//CREATE
router.post("/create", verifyTokenAndAdmin,async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.post("/update/:id",verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    savedProduct=await updatedProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }  
});

//DELETE
router.post("/delete/:id",verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});



//Get one Product
router.post("/oneProduct/:id",verifyToken, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id );
    
    if(!Product){
      return res.status(404).json({ msg: 'Product not found' });
  }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all Products
router.post("/all",verifyToken, async (req, res) => {
  try {
    
      let results= await Product.find();
      return res.status(200).json(results);
    
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
