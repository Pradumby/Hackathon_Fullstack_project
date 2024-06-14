// import {ConnectionStates} from "mongoose";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Organizer.css";

const OrganizerEventList = () => {
  // const {auth} = useContext(AuthContext);
  const [hackathons, setHackathons] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHackathons = async () => {
      const response = await fetch("http://localhost:5005/api/hackathons", {
        method: "GET",
        headers: {Authorization: token},
      });
      const data = await response.json();
      setHackathons(data);
    };

    fetchHackathons();
  }, [token]);

  const handleDelete = async (id) => {
    setError("");

    try {
      await fetch(`http://localhost:5005/api/hackathons/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setHackathons(hackathons.filter((hackathon) => hackathon._id !== id));
      alert("Hackathon Deleted Successfully");
    } catch (err) {
      console.error("Failed to delete the hackathon:", err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/organizer-event-update/${id}`);
  };

  return (
    <div className="organizer-event-list">
      <h2>Your Hackathons</h2>
      <ul>
        {hackathons.map((hackathon) => (
          <li key={hackathon._id}>
            <Link to={`/participants/${hackathon._id}`}>
              <h3>{hackathon.eventName}</h3>
            </Link>
            <p>{new Date(hackathon.date).toLocaleDateString()}</p>
            <p>{hackathon.description}</p>
            <div className="action-buttons">
              <button
                onClick={() => handleUpdate(hackathon._id)}
                className="update-button"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(hackathon._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizerEventList;
