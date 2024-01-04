import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SRV);

        console.log("DB connected Successfully")
    } catch (error) {
        console.error(error)
    }
}

dbConnect();