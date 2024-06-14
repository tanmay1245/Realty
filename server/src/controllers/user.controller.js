import User from "../models/user.model.js";
import Listing from "../models/listing.model.js"
import errorHandler from "../utils/error.js";

export const updateUser = (req, res, next) => {
    const updates = Object.keys(req.body);
    User.findById(req.user._id).then((user) => {
        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        user.save().then((user) => {
            return res.status(200).send({
                username: user.username,
                email: user.email,
                avatar: user.avatar
            });
        }).catch((error) => {
            // console.log("error in updateUser", error)
            return next(errorHandler());
        })
    });
};

export const deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.user._id).then((user) => {
        if (!user) {
            return res.status(404).send("No user found!");
        }
        res.clearCookie("token").status(200).send("User has been deleted");
    }).catch((error) => {
        res.status(400).send(error)
    });
};

export const getUserListings = (req, res, next) => {
    Listing.find({ userRef: req.user._id }).then((listings) => {
        res.status(200).send(listings);
    }).catch((error) => {
        return next(errorHandler());
    })
};

export const getUserInfo = (req, res, next) => {
    User.findById(req.params.id).then((user) => {
        if (!user) {
            return next(errorHandler(404, "User not found!"));
        }
        const { password: pass, ...rest } = user._doc;
        res.status(200).send(rest);
    }).catch((error) => {
        console.log("error", error)
        return next(errorHandler());
    })
}