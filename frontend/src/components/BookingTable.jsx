import React from "react";

const BookingTable = ({ bookings }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Course Code</th>
          <th>Exam Type</th>
          <th>Mac ID</th>
          <th>Date</th>
          <th>Slot</th>
          <th>Room Number</th>
        </tr>
      </thead>
      <tbody>
      {bookings.map((booking, index) => (
          <tr key={index}>
            <td>{booking.courseName}</td>
            <td>{booking.courseCode}</td>
            <td>{booking.exam}</td>
            <td>{booking.macID}</td>
            <td>{new Date(booking.Date).toLocaleDateString()}</td>
            <td>{booking.slot}</td>
            <td>{booking.roomNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingTable;
