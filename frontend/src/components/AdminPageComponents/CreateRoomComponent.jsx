import { useState } from "react";

const CreateRoomComponent = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [statusMessage, setStatusMessage] = useState("");  // State to store status message

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleRoomCapacityChange = (e) => {
    setRoomCapacity(e.target.value);
  };

  const createRoom = async (e) => {
    e.preventDefault();
    const createdRoom = {
      roomNumber,
      roomType,
      roomCapacity,
    };
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/v1/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createdRoom),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Created successfully:", data);
        setStatusMessage("Room created successfully!");  // Show success message
        // Reset the form fields
        setRoomNumber("");
        setRoomType("");
        setRoomCapacity("");

        // Hide success message after 3 seconds
        setTimeout(() => {
          setStatusMessage("");
        }, 3000);
      } else {
        console.error("Failed to create Room:", data.message || "Unknown error");
        setStatusMessage("Failed to create room. Please try again.");  // Show failure message
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      setStatusMessage("Error creating room. Please try again.");  // Show error message
    }
  };

  return (
    <div>
      <form className="admin-form" onSubmit={createRoom}>
        <div className="form-group">
          <input
            type="text"
            className="input-field"
            placeholder="Enter Room Number"
            onChange={handleRoomNumberChange}
            value={roomNumber}
          />
        </div>
        <div className="form-group">
          <select className="select-field" onChange={handleRoomTypeChange} value={roomType}>
            <option value="">Select Type of Exam</option>
            <option value="CIA">CIA</option>
            <option value="Module">Module</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="input-field"
            placeholder="Room Capacity"
            onChange={handleRoomCapacityChange}
            value={roomCapacity}
          />
        </div>
        <div className="form-group">
          <button className="submit-button" type="submit">
            Create Room
          </button>
        </div>
      </form>
      {statusMessage && (
        <div className="status-message">
          <p>{statusMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CreateRoomComponent;
