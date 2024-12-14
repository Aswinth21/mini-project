import { useState } from "react";
import './styles/AdminPage.css';
import OpenRoomComponent from "../components/AdminPageComponents/OpenRoomComponent";
import CloseRoomComponent from "../components/AdminPageComponents/CloseRoomComponent";
import SeeBookingsComponent from "../components/AdminPageComponents/SeeBookingsComponent";

const AdminPage = () => {

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
  }

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  }

  const handleRoomCapacityChange = (e) => {
    setRoomCapacity(e.target.value);
  }


  const createRoom = async (e) => {
    e.preventDefault();
    const createdRoom = {
      roomNumber,
      roomType,
      roomCapacity
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
      console.log(data);
      if (response.ok) {
        console.log("Created successfully:", data);
      } else {
        console.error("Failed to create Room:", data.message || "Unknown error");
      }
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }
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

  return (
    <>
    <form className="admin-form">
      <div className="form-group">
        <input
          type="text"
          className="input-field"
          placeholder="Enter Room Number"
          onChange={handleRoomNumberChange}
        />
      </div>
      <div className="form-group">
        <select className="select-field" onChange={handleRoomTypeChange}>
          <option value="null">Select Type of Exam</option>
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
        />
      </div>
      <div className="form-group">
        <button className="submit-button" onClick={createRoom}>Create</button>
      </div>
    </form>
    <div>
      <CloseRoomComponent/>
    </div>
    <div>
      <OpenRoomComponent/>
    </div>
    <div>
      <SeeBookingsComponent/>
    </div>
    <div>
      <button onClick={logoutButton}>
        Logout
      </button>
    </div>
    </>
  )
}

export default AdminPage;
