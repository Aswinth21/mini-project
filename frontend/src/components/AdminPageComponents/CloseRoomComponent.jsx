import React from 'react'
import RoomSelection from "../RoomSelection";
import SelectionComponent from "../SelectionComponent";
import { useState } from 'react';

const CloseRoomComponent = () => {

    const [exam, setExam] = useState("");
    const [room, setRoom] = useState({ roomId: "", roomNumber: "" });

    const CloseRoom = async () => {
        try {
            const response = await fetch(`/api/v1/admin/close/${room.roomId}` , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error closing room:', error);
        }
    }

  return (
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
        <button onClick={ CloseRoom }>Close Room</button>
      </div>
  )
}

export default CloseRoomComponent;