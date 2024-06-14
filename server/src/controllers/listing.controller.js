import Listing from "../models/listing.model.js";
import errorHandler from "../utils/error.js";

export const createListing = (req, res, next) => {
    const listing = new Listing(req.body);
    listing.save().then((listing) => {
        return res.status(201).send(listing);
    }).catch((error) => {
        return next(error);
    });
};

export const deleteListing = (req, res, next) => {
    Listing.findById(req.params.id).then((listing) => {
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        if (listing.userRef !== req.user.id) {
            return next(errorHandler(401, "You can only delete your own listings."))
        };

        Listing.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).send("Listing has been deleted.");
        });
    });
};

export const updateListing = (req, res, next) => {
    Listing.findById(req.params.id).then((listing) => {
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        if (listing.userRef !== req.user.id) {
            return next(errorHandler(401, "You can only delete your own listings."))
        };

        Listing.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((listing) => {
            res.status(200).send(listing);
        });
    });
};

export const getListing = (req, res, next) => {
    Listing.findById(req.params.id).then((listing) => {
        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        res.status(200).send(listing);
    });
};

export const getListings = (req, res, next) => {
    const limit = Number(req.query.limit) || 9;
    const startIndex = Number(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
        offer = { $in: [true, false] }
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
        furnished = { $in: [true, false] }
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
        parking = { $in: [true, false] }
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
        type = { $in: ["rent", "sell"] }
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
    }).sort({ [sort]: order }).limit(limit).skip(startIndex).then((listings) => {
        if (!listings) {
            return res.status(404).send("Listings not found");
        }

        res.status(200).send(listings);
    });
};

export const getSearchSuggestions = (req, res, next) => {
    Listing.find({
        name: { $regex: req.query.searchTerm, $options: 'i' }
    }).then((listings) => {
        res.status(200).send(listings);
    })
}