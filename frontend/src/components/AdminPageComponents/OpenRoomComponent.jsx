import React, { useState } from 'react';
import RoomSelection from '../RoomSelection';
import SelectionComponent from '../SelectionComponent';

const OpenRoomComponent = () => {
  const [exam, setExam] = useState("");
  const [room, setRoom] = useState({ roomId: "", roomNumber: "" });
  const [statusMessage, setStatusMessage] = useState("");

  const OpenRoom = async () => {
    try {
      const response = await fetch(`/api/v1/admin/open/${room.roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setStatusMessage(`Room ${room.roomNumber} has been opened.`);
      } else {
        setStatusMessage(`Room ${room.roomNumber} is already open.`);
      }

      setExam("");
      setRoom({ roomId: "", roomNumber: "" });

      setTimeout(() => {
        setStatusMessage("");
      }, 4000); 

    } catch (error) {
      console.error('Error opening room:', error);
      setStatusMessage('Error opening the room.');
      setTimeout(() => {
        setStatusMessage("");
      }, 4000); 
    }
  };

  return (
    <div>
      {!exam && (
        <div className="exam-mode-container">
          <SelectionComponent onExamChange={setExam} />
        </div>
      )}

      {exam && !room.roomNumber &&(
        <div className="room-selection-container">
          <RoomSelection onRoomSelect={setRoom} exam={exam} />
        </div>
      )}

      {room.roomNumber && (
        <div className="selected-room">
          <p>Selected Room: {room.roomNumber}</p>
        </div>
      )}

      {statusMessage && (
        <div className="status-message">
          <p>{statusMessage}</p>
        </div>
      )}

      {room.roomId && (
        <button className="open-close-button" onClick={OpenRoom}>Open Room</button>
      )}
    </div>
  );
};

export default OpenRoomComponent;
