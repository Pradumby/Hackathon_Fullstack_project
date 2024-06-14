import React, {useState, useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import "./Hackathon.css";

const HackathonUpdateForm = () => {
  const {Id} = useParams();
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  //   useEffect(() => {
  // Fetch existing hackathon details to prefill the form (if required)
  // const fetchHackathon = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5005/api/hackathons/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     if (response.ok) {
  //       setEventName(data.eventName);
  //       setDate(new Date(data.date).toISOString().split("T")[0]);
  //       setDescription(data.description);
  //     } else {
  //       setError("Failed to load hackathon details.");
  //     }
  //   } catch (err) {
  //     setError("Failed to load hackathon details.");
  //   }
  // };
  // fetchHackathon();
  //   }, [id]);

  const handleUpdateHackathon = async (e) => {
    e.preventDefault();
    setError("");

    const hackathonData = {eventName, date, description};

    try {
      const response = await fetch(
        `http://localhost:5005/api/hackathons/${Id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(hackathonData),
        }
      );

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        alert("Hackathon Update Successful");
        navigate("/organizer-events");
      } else {
        setError(data.message || "...An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="hackathon-form-container">
      <form onSubmit={handleUpdateHackathon}>
        <h2 className="hackathon-form-title">Update Hackathon</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="hackathon-form-input"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="hackathon-form-input"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="hackathon-form-textarea"
          required
        ></textarea>
        <button
          type="submit"
          className="hackathon-form-button"
        >
          Update
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default HackathonUpdateForm;
