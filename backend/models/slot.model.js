import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    username: {
        type: String,
        required: true
    }, 
    exam: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    macID: {
        type: String,
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    slot: {
        type: String,
        required: true
    }
}, {timestamps: true});

const SlotBooking = mongoose.model("SlotBooking", slotSchema);

export default SlotBooking;