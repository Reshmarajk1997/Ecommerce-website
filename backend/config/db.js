import mongoose from "mongoose"

const  connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected...')
    } catch (error) {
        console.log('error in connecting to mongodb ',error)
        
    }
}

export default  connectDB;