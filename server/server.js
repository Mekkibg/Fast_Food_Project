const express=require("express")
const Connectdb = require("./config/ConnectDb")
const router = require("./routes/auth")
require('dotenv').config()
const User  = require("./models/User");
const mongodb = require('mongodb');
const  Product  = require("./models/Product");
const app=express()


Connectdb()
app.use(express.json())

app.use(express.static('public'))

app.use('/api/users',router)
app.use("/products", require("./routes/productRoutes"))
app.use("/orders", require("./routes/ordersRoutes"))
app.use("/categories", require("./routes/categoryRoutes"))

app.get('/read', async (req, res) => {
    User.find({}, (err, result) => {
        if (err){
            res.send(err)
        }
        res.send(result)
    }
    );
})
app.delete("/delete/:id", async (req,res)=>{ 
const id = req.params.id;
await User.findByIdAndRemove(id).exec();    
res.send("Done");
}
);
app.delete("/remove/:id", async (req,res)=>{ 
    const id = req.params.id;
    await Product.findByIdAndRemove(id).exec();    
    res.send("Done");
    }
    );


app.listen(process.env.port,()=>console.log(`Port is running on port ${process.env.port}`))