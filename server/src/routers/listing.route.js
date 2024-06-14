import express from "express"
import { createListing, deleteListing, updateListing, getListing, getListings, getSearchSuggestions } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = new express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
router.get("/getsearchsuggestions", getSearchSuggestions)

export default router;