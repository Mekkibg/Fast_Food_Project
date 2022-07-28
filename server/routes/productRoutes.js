const router = require('express').Router();
const Product = require('../models/Product');

router.get("/", (req,res)=>{
    Product.find().populate('_category')
    .then((data, error)=>{
        if (error) return res.status(400).json({status: false, error})
        return res.status(200).json(  
            data
        )
    })
    // res.json({msg:"success"})
});


router.get("/:uid", (req,res)=>{
    Product.findById(req.params.uid)
    .then((data, error)=>{
        if (error) return res.status(400).json({status: false, error})
        return res.status(200).json(  
            data
        )
    })
    // res.json({msg:"success"})
});


router.post("/create", (req,res)=>{
    const product = new Product (req.body);
    product.save((error, data)=>{
        if (error) return res.status(400).json({status: false, error})
        return res.status(200).json({
            status: true,
            message: "Product has been added",
            data,
        })
    })
})


router.patch("/update/:uid", (req,res)=>{
    const product = new Product({_id:req.params.id}, req.body);
    product.updateOne((error, data)=>{
        
        if (error) return res.status(400).json({status: false, error})
        return res.status(200).json({
            status: true,
            message: "Product has been added",
            data,
        })
    })
})

module.exports = router;