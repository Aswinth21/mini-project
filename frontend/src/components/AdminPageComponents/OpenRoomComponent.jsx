import React from 'react'
import { useState } from 'react';
import RoomSelection from '../RoomSelection';
import SelectionComponent from '../SelectionComponent';

const OpenRoomComponent = () => {
    const [exam, setExam] = useState("");
    const [room, setRoom] = useState({ roomId: "", roomNumber: "" });

    const OpenRoom = async () => {
        try {
            const response = await fetch(`/api/v1/admin/open/${room.roomId}` , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error opening room:', error);
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
        <button onClick={ OpenRoom }>Open Room</button>
      </div>
  )
}

export default OpenRoomComponent