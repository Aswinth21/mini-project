import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createRoom, closeRoom, editRoom, openRoom } from "../controllers/room.contoller.js";
import { getAllBookings, getFilteredSlots, getUserName } from "../controllers/slot.controller.js";

const router = express.Router();

router.post("/create",protectRoute, createRoom);
router.put("/close/:roomId",protectRoute, closeRoom);
router.post("/edit",protectRoute, editRoom);
router.put("/open/:roomId",protectRoute, openRoom);
router.get("/slots", protectRoute, getAllBookings);
router.get("/filteredSlots/:slot/:roomNumber",  getFilteredSlots);
router.get("/getName/:username", getUserName);

export default router;