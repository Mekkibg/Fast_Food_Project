const router = require('express').Router();
const {Orders} = require('../models/Orders');

router.get("/", (req,res)=>{
    Orders.find({}).populate('data')
    .then((data, error)=>{
        if (error) return res.status(400).json({status: false, error})
        return res.status(200).json(  
            data
        )
    })
    // res.json({msg:"success"})
});

router.post("/create", (req,res)=>{
    const orders = new Orders (req.body);
    // link products with orders get them from DB and calculate total price then we assign it to order object
    
    orders.save((error, data)=>{
        if (error) return res.status(400).json({status: false, error})
        return res.status(200).json({
            status: true,
            message: "Order has been added",
            data,
        })
    })
})

module.exports = router;