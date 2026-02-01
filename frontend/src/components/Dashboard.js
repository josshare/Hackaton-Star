import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { FolderPlus, LogOut, Plus } from "lucide-react";
import "./Dashboard.css";

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
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="app-title">AquaPredict</h1>
        <div className="header-actions">
          <button className="btn-new-project" onClick={() => {/* TODO: Implement create project */}}>
            <Plus size={20} />
            Nuevo Proyecto
          </button>
          <button className="btn-logout" onClick={handleLogout} title="Cerrar sesión">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="projects-section">
          <h2 className="section-title">Mis Proyectos</h2>
          <p className="section-description">
            Carpetas de análisis de estrés hídrico por zona
          </p>
          
          <div className="projects-content">
            <div className="empty-state">
              <div className="empty-icon">
                <FolderPlus size={64} />
              </div>
              <h3 className="empty-title">Sin proyectos</h3>
              <p className="empty-description">
                Crea tu primer proyecto para comenzar a organizar tus análisis de estrés hídrico.
              </p>
              <button className="btn-create-first-project" onClick={() => {/* TODO: Implement create project */}}>
                <Plus size={20} />
                Crear Primer Proyecto
              </button>
            </div>
          </div>
        </section>
      </main>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
