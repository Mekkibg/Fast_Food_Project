const router = require('express').Router();

const { Category } = require('../models/Category');


router.get("/", (req,res)=>{
    Category.find().exec()
    .then((data, error)=>{
        if (error) return res.status(400).json({status: false, error})
        return res.status(200).json(  
            data
        )
    })
    // res.json({msg:"success"})
});
router.post("/create", (req,res)=>{
    const category = new Category (req.body);
    category.save((error, data)=>{
        if (error) return res.status(400).json({status: false, error})
        return res.status(200).json({
            status: true,
            message: "Category has been added",
            data,
        })
    })
})


module.exports = router;
