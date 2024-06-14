import mongoose from "mongoose"

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("MongoDB connection successfull!!");
    }).catch((error) => {
        // console.log("error in mongodb connection", error);
        console.log("MongoDB connection failed");
    })
};

export default connectDB;