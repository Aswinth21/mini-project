import React, { useState } from 'react';
import AdminRoomSelection from './AdminRoomSelection';
import SelectionComponent from '../SelectionComponent';

const CloseRoomComponent = () => {
  const [exam, setExam] = useState("");
  const [room, setRoom] = useState({ roomId: "", roomNumber: "" });
  const [statusMessage, setStatusMessage] = useState("");

  const CloseRoom = async () => {
    try {
      const response = await fetch(`/api/v1/admin/close/${room.roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setStatusMessage(`Room ${room.roomNumber} has been closed.`);
      } else {
        setStatusMessage(`Room ${room.roomNumber} is already closed.`);
      }

      setExam("");
      setRoom({ roomId: "", roomNumber: "" });

      setTimeout(() => {
        setStatusMessage("");
      }, 4000); // 4 seconds delay

    } catch (error) {
      console.error('Error closing room:', error);
      setStatusMessage('Error closing the room.');
      setTimeout(() => {
        setStatusMessage("");
      }, 4000); // 4 seconds delay for error message
    }
  };

  return (
    <div>
      {/* Exam Selection */}
      {!exam && (
        <div className="exam-mode-container">
          <SelectionComponent onExamChange={setExam} />
        </div>
      )}

      {/* Room Selection */}
      {exam && !room.roomNumber && (
        <div className="room-selection-container">
          <AdminRoomSelection onRoomSelect={setRoom} exam={exam} roomFilter = {(room) => !room.isClosed}/>
        </div>
      )}

      {/* Selected Room Display */}
      {room.roomNumber && (
        <div className="selected-room">
          <p>Selected Room: {room.roomNumber}</p>
        </div>
      )}

      {/* Status Message */}
      {statusMessage && (
        <div className="status-message">
          <p>{statusMessage}</p>
        </div>
      )}

      {room.roomId && (
        <button className="open-close-button" onClick={CloseRoom}>Close Room</button>
      )}
    </div>
  );
};

export default CloseRoomComponent;
