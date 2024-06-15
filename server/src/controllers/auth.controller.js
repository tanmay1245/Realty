import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password
    });
    user.save().then((user) => {
        res.status(201).send({
            success: true,
            username: user.username
        });

    }).catch((error) => {
        next(error);
    });
};

export const signin = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return next(errorHandler(404, "User not found!"))
        }
        bcrypt.compare(password, user.password).then((valid) => {
            if (valid) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" }).status(200).send({
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar,
                    _id: user._id
                });
            } else {
                return next(errorHandler(401, "Invalid Credentials!"));
            }
        });
    })
};

export const google = async (req, res, next) => {
    const { name, email, photo } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true }).status(200).send({
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            _id: user._id
        });
    } else {
        const generatePassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(generatePassword, 8);
        const newUser = User({
            username: name.split(" ").join("").toLowerCase(),
            email,
            password: hashedPassword
        })
        newUser.save().then((user) => {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.cookie("token", token, { httpOnly: true }).status(200).send({
                username: user.username,
                email: user.email,
                avatar: user.avatar
            });

        }).catch((error) => {
            next(error);
        });
    }
};

export const signout = (req, res, next) => {
    res.clearCookie("token").send("User has been logged out");
};