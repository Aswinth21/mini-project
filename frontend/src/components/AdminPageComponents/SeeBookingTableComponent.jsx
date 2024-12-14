import React, { useState, useEffect } from "react";

const SeeBookingTableComponent = ({ bookings }) => {
  const [userNames, setUserNames] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserName = async (username) => {
    try {
      const response = await fetch(`/api/v1/admin/getName/${username}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error fetching user name:", error);
      return null;
    }
  };

  useEffect(() => {
    const getUserNames = async () => {
      setLoading(true);
      const names = {};
      for (let booking of bookings) {
        if (!names[booking.username]) {
          const userName = await fetchUserName(booking.username);
          if (userName) {
            names[booking.username] = userName;
          }
        }
      }
      setUserNames(names);
      setLoading(false);
    };

    if (bookings && bookings.length > 0) {
      getUserNames();
    }
  }, [bookings]);

  console.log("Bookings data:", bookings);
  console.log("User names:", userNames);

  return (
    <div>
      <h3>Booking Details</h3>
      {bookings && bookings.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>MAC ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.courseName}</td>
                <td>{booking.courseCode}</td>
                <td>{booking.macID}</td>
                <td>
                  {loading ? "Loading..." : userNames[booking.username] || "Not Found"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default SeeBookingTableComponent;
