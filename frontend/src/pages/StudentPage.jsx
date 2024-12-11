import { useState, useEffect } from "react";
import SelectionComponent from "../components/SelectionComponent";
import RoomSelection from "../components/RoomSelection";
import DateComponent from "../components/DateComponent";
import { useQuery } from "@tanstack/react-query";
import "./styles/StudentPage.css";
import BookingTable from "../components/BookingTable";

const StudentPage = () => {
  const [exam, setExam] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [macID, setMacID] = useState("");
  const [room, setRoom] = useState({ roomId: "", roomNumber: "" });
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [bookings, setBookings] = useState("");

  useEffect(() => {
    getBookings();
    console.log(bookings);
  }, []);

  const getBookings = async () => {
    try {
      const response = await fetch(`/api/v1/student/slots/${authUser._id}`);
      const data = await response.json();
      console.log(data);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  } 

  const bookSlot = async (e) => {
    e.preventDefault();
    const bookingData = {
      userId: authUser._id,
      username: authUser.username,
      exam,
      courseCode,
      courseName,
      macID,
      roomId: room.roomId,
      roomNumber: room.roomNumber,
      Date: date,
      slot,
    };
    console.log(bookingData);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/v1/student/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      }); 
      const data = await response.json();
      if (response.ok) {
        console.log("Booking successful:", data);
        window.location.reload();
      } else {
        console.error("Booking failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  const logoutButton = async () => {
    try {
      const res = await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const slotOptions = [
    { id: 1, label: "8:00 - 10:00" },
    { id: 2, label: "10:00 - 12:00" },
    { id: 3, label: "1:00 - 3:00" },
    { id: 4, label: "3:00 - 5:00" },
  ];

  return (
    <>
      <h2 className="user-info">Username: {authUser?.name}</h2>
      <h2 className="user-info">Register Number: {authUser?.registerNumber}</h2>
      <div className="student-page-container">
        <h1 className="student-page-title">Selected Exam: {exam}</h1>
        {!exam && (
          <div className="exam-mode-container">
            <SelectionComponent onExamChange={setExam} />
          </div>
        )}
        {!room.roomNumber && exam && (
          <div className="room-selection-container">
            <RoomSelection onRoomSelect={setRoom} exam = {exam}/>
          </div>
        )}
        {exam && room.roomNumber && (
          <form className="booking-form">
            <label className="form-label">Course Code:</label>
            <input
              type="text"
              className="form-input"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />

            <label className="form-label">Course Name:</label>
            <input
              type="text"
              className="form-input"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />

            <label className="form-label">MAC ID:</label>
            <input
              type="text"
              className="form-input"
              value={macID}
              onChange={(e) => setMacID(e.target.value)}
            />

            <label className="form-label">Room Number:</label>
            <input
              type="text"
              className="form-input"
              value={room.roomNumber}
              readOnly
            />

            <DateComponent onDateChange={(date) => setDate(new Date(date).toISOString())} />

            <label className="form-label">Slot:</label>
            <select
              className="form-select"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
            >
              <option value="">Select a slot</option>
              {slotOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>

            <button className="form-button book-button" onClick={bookSlot} type="submit">
              Book
            </button>
          </form>
        )}
      </div>
      <div>
      <div>
      <h1>Booking Details</h1>
      <div>
        <label>
          Filter Date (yyyy-mm-dd):{" "}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
        <label>
          Filter Slot:{" "}
          <input
            type="text"
            value={filterSlot}
            onChange={(e) => setFilterSlot(e.target.value)}
          />
        </label>
        <button onClick={handleFilter}>Apply Filter</button>
      </div>
      {filteredBookings.length > 0 ? (
        <BookingTable bookings={filteredBookings} />
      ) : (
        <p>No bookings match the criteria.</p>
      )}
    </div>
      </div>
      <button className="form-button logout-button" onClick={logoutButton}>
        Logout
      </button>
    </>
  );
};

export default StudentPage;
