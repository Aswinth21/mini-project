import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createRoom, closeRoom, editRoom, openRoom } from "../controllers/room.contoller.js";
import { getAllBookings } from "../controllers/slot.controller.js";

const router = express.Router();

router.post("/create",protectRoute, createRoom);
router.post("/close",protectRoute, closeRoom);
router.post("/edit",protectRoute, editRoom);
router.post("/open",protectRoute, openRoom);
router.get("/slots", protectRoute, getAllBookings);

export default router;