import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Hackathon.css";

const HackathonForm = () => {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    setError("");

    const hackathonData = {eventName, date, description};

    try {
      const response = await fetch("http://localhost:5005/api/hackathons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(hackathonData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Hackathon Created successfully");
        navigate("/organizer-events");
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="hackathon-form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="hackathon-form-title">Create Hackathon</h2>
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
          Create
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default HackathonForm;
