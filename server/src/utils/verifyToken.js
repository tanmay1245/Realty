import errorHandler from "./error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next(errorHandler(401, "Unathorized"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Forbidden"));
        User.findById(user.id).then((user) => {
            if (!user) {
                return next(errorHandler(401, "Please Authenticate."));
            }
            req.user = user;
            next();
        }).catch(() => {
            return next(errorHandler(401, "Please Authenticate."));
        });
    });
};