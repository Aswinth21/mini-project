import React, { useState } from 'react';
import SelectionComponent from '../components/SelectionComponent';
import RoomSelection from '../components/RoomSelection';

const StudentPage = () => {
  const [exam, setExam] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [macID, setMacID] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const bookSlot = async (e) => {
    e.preventDefault();
    const bookingData = {
      exam,
      courseCode,
      courseName,
      macID,
      roomNumber,
      date,
      slot,
    };

    try {
        const token = localStorage.getItem("authToken");
      const response = await fetch('/api/v1/student/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log('Booking successful:', data);
      } else {
        console.error('Booking failed:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  const slotOptions = [
    { id: 1, label: "8:00 - 10:00" },
    { id: 2, label: "10:00 - 12:00" },
    { id: 3, label: "1:00 - 3:00" },
    { id: 4, label: "3:00 - 5:00" }
  ];

  const handleSlotChange = (e) => {
    setSlot(e.target.value);
  };

  return (
    <div>
      <h1>Selected Exam: {exam}</h1>
      {!exam && <SelectionComponent onExamChange={setExam} />}
      {!roomNumber && exam && <RoomSelection onRoomSelect={setRoomNumber} />}
      <form>
        <label>Course Code:</label>
        <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />

        <label>Course Name:</label>
        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />

        <label>MAC ID:</label>
        <input type="text" value={macID} onChange={(e) => setMacID(e.target.value)} />

        <label>Room Number:</label>
        <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />

        <label>Date:</label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Slot:</label>
        <select value={slot} onChange={handleSlotChange}>
          <option value="">Select a slot</option>
          {slotOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>

        <button onClick={bookSlot}>Book</button>
      </form>
    </div>
  );
};

export default StudentPage;
