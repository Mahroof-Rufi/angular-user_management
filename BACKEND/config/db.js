import { mongoose } from "mongoose";

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log('Databse connected');
    } catch (error) {
        console.log("something went wrong on the database"+error);
    }
}

export default connectDB