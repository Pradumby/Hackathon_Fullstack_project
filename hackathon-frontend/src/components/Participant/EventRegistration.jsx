import React, {useState, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "./Participant.css";

const EventRegistration = () => {
  const {hackathonId} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  // const {auth} = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const participantData = {
      name,
      email,
      phone,
      experience,
      skills,
      hackathonId,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/participants/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(participantData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("registration successfull");
        navigate("/participant-dashboard");
      } else {
        setError(data.message || "..An error occurred. Please try again.");
      }
    } catch (err) {
      setError("...An error occurred. Please try again.");
    }
  };

  return (
    <div className="event-registration-container">
      <form onSubmit={handleSubmit}>
        <h2 className="event-registration-title">Event Registration</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="event-registration-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="event-registration-input"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="event-registration-input"
          required
        />
        <input
          type="text"
          placeholder="Total Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="event-registration-input"
          required
        />
        <textarea
          placeholder="Skills & Expertise"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="event-registration-textarea"
          required
        ></textarea>
        <button
          type="submit"
          className="event-registration-button"
        >
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default EventRegistration;
