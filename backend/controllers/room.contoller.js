import Room from "../models/room.model.js";

export const createRoom = async (req, res) => {
    try {
        const {roomNumber, roomCapacity, roomType} = req.body;
        const room = new Room({roomNumber, roomCapacity, roomType});
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("error in createRoom controller");
    }
}

export const editRoom = async (req, res) => {
    const {roomNumber, roomCapacity, roomType} = req.body;
    try{
        const room = await Room.findByIdAndUpdate(req.params.id, {roomNumber, roomCapacity, roomType});
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({message: error.message});
        console.log("error in editRoom controller");
    }
}

export const closeRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);
        
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (room.isClosed == true)
            {
                return res.status(404).json({ message: 'Room is already closed' });
            }

        room.isClosed = true;
        await room.save();

        res.status(200).json(room);
        console.log("Room closed successfully.");
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in closeRoom controller:", error);
    }
}

export const openRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);
        
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (room.isClosed == false)
        {
            return res.status(404).json({ message: 'Room is already open' });
        }

        room.isClosed = false;
        await room.save();

        res.status(200).json(room);
        console.log("Room opened successfully.");
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in openRoom controller:", error);
    }
}