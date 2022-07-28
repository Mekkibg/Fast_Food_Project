const mongoose=require('mongoose')

const Connectdb=async()=>{
    try {
      
       await mongoose.connect(process.env.MONGO_URI)
       
        console.log('datab is connected')
    } catch (error) {
        console.log('datab is not connected')
    }
}

module.exports=Connectdb