import { useState } from "react";
import CreateRoomComponent from "../components/AdminPageComponents/CreateRoomComponent";
import OpenRoomComponent from "../components/AdminPageComponents/OpenRoomComponent";
import CloseRoomComponent from "../components/AdminPageComponents/CloseRoomComponent";
import SeeBookingsComponent from "../components/AdminPageComponents/SeeBookingsComponent";
import './styles/AdminPage.css';

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState("menu");
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


  const renderComponent = () => {
    switch (activeComponent) {
      case "createRoom":
        return <CreateRoomComponent />;
      case "openRoom":
        return <OpenRoomComponent />;
      case "closeRoom":
        return <CloseRoomComponent />;
      case "seeBookings":
        return <SeeBookingsComponent />;
      default:
        return (
          <div className="admin-menu">
            <h2>Select an option:</h2>
            <ul>
              <li>
                <button onClick={() => setActiveComponent("createRoom")}>
                  Create Room
                </button>
              </li>
              <li>
                <button onClick={() => setActiveComponent("openRoom")}>
                  Open Room
                </button>
              </li>
              <li>
                <button onClick={() => setActiveComponent("closeRoom")}>
                  Close Room
                </button>
              </li>
              <li>
                <button onClick={() => setActiveComponent("seeBookings")}>
                  See Bookings
                </button>
              </li>
            </ul>
            
          </div>
        );
    }
  };

  return (
    <>
    <button className="form-button logout-button" onClick={logoutButton}>
        Logout
      </button>
    <div className="admin-page-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-content">{renderComponent()}</div>
      {activeComponent !== "menu" && (
        <button
          className="back-button"
          onClick={() => setActiveComponent("menu")}
        >
          Back to Menu
        </button>
      )}
    </div>
    </>
  );
};

export default AdminPage;
