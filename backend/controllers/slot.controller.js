import Room from "../models/room.model.js";
import SlotBooking from "../models/slot.model.js";
import User from "../models/user.model.js";

export const bookSlot = async (req, res) => {
    try{
        const {userId,username, exam, courseCode, courseName, macID, roomId, roomNumber, Date, slot} = req.body;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        const room = await Room.findOne({roomNumber});
        if(!room) {
            return res.status(404).json({message: "Room not found"});
        }
        const slotBooking = new SlotBooking({
            userId: userId,
            username,
            exam,
            courseCode,
            courseName,
            macID,
            roomId,
            roomNumber,
            Date,
            slot
        });
        await slotBooking.save();
        res.status(201).json({message: "Slot booked successfully"});   
    }
    catch (error) {
        console.error(`error booking slot: ${error.message}`);
    }
}
export const editSlot = async (req, res) => {
    try{
        const {userId, exam, courseCode, courseName, macID,roomId, roomNumber, Date,slot} = req.body;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        const slotBooking = await SlotBooking.findOneAndUpdate({userId: userId}, {
            exam,
            courseCode,
            courseName,
            macID,
            roomId,
            roomNumber,
            Date,
            slot
        });
        res.status(200).json({message: "Slot updated successfully"});
    }
    catch (error) {
        console.error(`error editing slot: ${error.message}`);
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }
    catch(error) {
        console.error(`error getting rooms: ${error.message}`);
    }
}

export const getSlots = async (req, res) => {
    try{
        const { userId } = req.params;
        const slots = await SlotBooking.find({userId : userId})
        if(slots){
            res.status(200).json(slots);
        }
        else{
            res.status(401).json({message: "No Bookings Found"});
        }
    }
    catch(error) {
        console.error(`error Booking slots: ${error.message}`);
    }
}

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await SlotBooking.find();
        res.status(200).json(bookings);
    }
    catch (error) {
        console.error(`error getting bookings: ${error.message}`);
    }
}

export const getFilteredSlots = async (req, res) => {
    try {
        const { slot, roomNumber } = req.params;
        console.log( slot, roomNumber);
        const slots = await SlotBooking.find({ slot: slot, roomNumber: roomNumber})
        if(slots){
            res.status(200).json(slots);
        }
        else{
            res.status(401).json({message: "No Bookings Found"});
        }
    }
    catch (error) {
        console.error(`error getting filtered slots: ${error.message}`);
    }
}

export const getUserName = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({username : username});
        
        if (user) {
          res.status(200).json({ name: user.name });
        } else {
          res.status(404).json({ message: "User Not Found" });
        }
        console.log(user.name);
      } catch (error) {
        console.error('Error fetching user name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}