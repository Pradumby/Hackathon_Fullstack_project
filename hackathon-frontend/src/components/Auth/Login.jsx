import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5005/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
      });

      const data = await response.json();
      console.log("jbcujdbcdebfbedfbe", data);
      if (response.ok) {
        // setAuth(data);
        localStorage.setItem("token", data.token);
        console.log("Login successful, navigating to dashboard...");
        navigate(
          data.role === "organizer"
            ? "/organizer-dashboard"
            : "/participant-dashboard"
        );
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />
        <button
          type="submit"
          className="auth-button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
