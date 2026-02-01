import React from "react";
import { useHistory } from "react-router-dom";
import { FolderPlus, LogOut, Plus } from "lucide-react";
import "./Dashboard.css";

export default function Dashboard({ projects, onLogout }) {
  const history = useHistory();

  function handleCreateProject() {
    history.push("/new-project");
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="app-title">AquaPredict</h1>
        <div className="header-actions">
          <button className="btn-new-project" onClick={handleCreateProject}>
            <Plus size={20} />
            Nuevo Proyecto
          </button>
          <button className="btn-logout" onClick={onLogout} title="Cerrar sesión">
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
            {projects.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FolderPlus size={64} />
                </div>
                <h3 className="empty-title">Sin proyectos</h3>
                <p className="empty-description">
                  Crea tu primer proyecto para comenzar a organizar tus análisis de estrés hídrico.
                </p>
                <button className="btn-create-first-project" onClick={handleCreateProject}>
                  <Plus size={20} />
                  Crear Primer Proyecto
                </button>
              </div>
            ) : (
              <div className="project-list">
                {projects.map(project => (
                  <div key={project.id} className="project-card">
                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    <p className="project-date">Creado: {project.createdAt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
