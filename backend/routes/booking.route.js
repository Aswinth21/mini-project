import express, { Router } from 'express'
import { bookSlot, editSlot, getSlots } from '../controllers/slot.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { getRooms } from '../controllers/slot.controller.js';

const router = express.Router();

router.post("/book",protectRoute, bookSlot);
router.post("/edit", protectRoute, editSlot);
router.get("/rooms", protectRoute, getRooms);
router.get("/slots/:userId", protectRoute, getSlots);


export default router;