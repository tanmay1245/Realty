import 'dotenv/config'
import express from "express";
import cors from "cors";
import connectDB from "./db/mongoose.js";
import userRouter from "./routers/user.route.js";
import authRouter from "./routers/auth.route.js";
import listingRouter from "./routers/listing.route.js";
import cookieParser from "cookie-parser"

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    credentials: true,
}
app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).send({
        success: false,
        statusCode,
        message
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is up running on port", PORT);
});