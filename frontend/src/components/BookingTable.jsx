import PropTypes from 'prop-types';

const BookingTable = ({ bookings }) => {
  const slotTimings = {
    1: "08:00 - 10:00",
    2: "10:00 - 12:00",
    3: "1:00 - 3:00",
    4: "3:00 - 5:00",
  };

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
        {upcomingBookings.map((booking, index) => (
          <tr key={`upcoming-${index}`} style={{ backgroundColor: "white", color: "black" }}>
            <td>{booking.courseName}</td>
            <td>{booking.courseCode}</td>
            <td>{booking.exam}</td>
            <td>{booking.macID}</td>
            <td>{new Date(booking.Date).toLocaleDateString()}</td>
            <td>{slotTimings[booking.slot]}</td>
            <td>{booking.roomNumber}</td>
          </tr>
        ))}
        {completedBookings.map((booking, index) => (
          <tr key={`completed-${index}`} style={{ backgroundColor: "#81d4fa", color: "black" }}>
            <td>{booking.courseName}</td>
            <td>{booking.courseCode}</td>
            <td>{booking.exam}</td>
            <td>{booking.macID}</td>
            <td>{new Date(booking.Date).toLocaleDateString()}</td>
            <td>{slotTimings[booking.slot]}</td>
            <td>{booking.roomNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
BookingTable.propTypes = {
  bookings: PropTypes.array.isRequired,  // Validate 'bookings' prop
};

export default BookingTable;
