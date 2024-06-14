import express from "express"
import { updateUser, deleteUser, getUserListings, getUserInfo } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = new express.Router();

router.post("/update", verifyToken, updateUser);
router.delete("/delete", verifyToken, deleteUser);
router.get("/listings", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUserInfo);

export default router;