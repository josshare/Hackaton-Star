import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <h2>Dashboard</h2>
      {error && <p>{error}</p>}
      <strong>Email:</strong> {currentUser.email}
      <button onClick={handleLogout}>
        Log Out
      </button>
    </>
  );
}
