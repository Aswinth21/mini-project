import React from 'react'
import { useState } from 'react';
import RoomSelection from '../RoomSelection';
import SelectionComponent from '../SelectionComponent';
import SeeBookingTableComponent from './SeeBookingTableComponent';

const SeeBookingsComponent = () => {

    const [selectedSlot, setSelectedSlot] = useState('');
    const [exam, setExam] = useState("");
    const [room, setRoom] = useState({ roomId: "", roomNumber: "" });
    const [bookings, setBookings] = useState("");
    


    const handleSlotChange = (event) => {
        setSelectedSlot(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const getBookings = async () => {
        const response = await fetch(`/api/v1/admin/filteredSlots/${selectedSlot}/${room.roomNumber}`);
        const data = await response.json();
        console.log(data);
        setBookings(data);
    }

  return (
    <div>
        {!bookings && (
            <div>
                {!exam && (
                    <div className="exam-mode-container">
                    <SelectionComponent onExamChange={setExam} />
                    </div>
                )}
                {!room.roomNumber && exam && (
                    <div className="room-selection-container">
                    <RoomSelection onRoomSelect={setRoom} exam={exam} />
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="slot">Select Slot:</label>
                        <select
                            id="slot"
                            value={selectedSlot}
                            onChange={handleSlotChange}
                            required
                        >
                            <option value="">--Select Slot--</option>
                            <option value="1">08:00 - 10:00</option>
                            <option value="2">10:00 - 12:00</option>
                            <option value="3">01:00 - 03:00</option>
                            <option value="4">03:00 - 05:00</option>
                        </select>
                    </div>

                    <button onClick={getBookings}>Get Bookings</button>
                </form>
            </div>
        )
        }
        {bookings && (
            <SeeBookingTableComponent bookings={bookings}/>
        )}
    </div>
  )
}

export default SeeBookingsComponent