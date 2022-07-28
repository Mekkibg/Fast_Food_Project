const mongoose = require ('mongoose')

const ordersSchema = mongoose.Schema ({

    date:{
        type: Date,
        default: () => new Date(+new Date() + 7*24*60*60*1000)
    },
    data : {
        type : String,
        required : true,
    },
    buyer:{
        type:String,
        required : true,
    },
    
    status:{
        type : String,
        default : 'In list',
    },
    total:{
        type: Number,
        default : 0,
    }

})

const Orders = mongoose.model('orders', ordersSchema);

module.exports = {Orders};