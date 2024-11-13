import React, { useState, useEffect } from 'react';


const RoomSelection = ({ exam , onRoomSelect}) => {
  const [rooms, setRooms] = useState([]);

  const getRoom = async () => {
    try {
      const response = await fetch('/api/v1/student/rooms');
      const data = await response.json();
      console.log(data);
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    getRoom();
    console.log(exam);
  }, [exam]);

  return (
    <div>
      <h1>Select a Room</h1>
      {rooms
        .filter(room => room.roomType == exam)
        .map((room, index) => (
          <button 
            key={index} 
            onClick={() => onRoomSelect({ roomId: room._id, roomNumber: room.roomNumber })}
          >
            {room.roomNumber}
          </button>
      ))}
    </div>
  );
};

export default RoomSelection;
