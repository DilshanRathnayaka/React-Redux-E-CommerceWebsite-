const router = require("express").Router();
const Product = require("../Models/product");

router.post("/",async(req,res)=>{
    const product = new Product(req.body);

    try{
        const saved = await product.save();
        res.status(200).json(saved)
    }catch(err){
        res.status(400).json(err);
    }
})

router.get("/",async(req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }catch(err){
        res.status(400).json(err);
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const deleted = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(deleted);
    }catch(err){
        res.status(400).json(err);
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const find = await Product.findById(req.params.id)
        res.status(200).json(find)
    }catch(err){
        res.status(400).json(err)
    }
})
module.exports = router;