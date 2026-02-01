import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ArrowLeft, FolderPlus, Droplets } from "lucide-react";
import "./NewProject.css";

export default function NewProject({ onCreateProject }) {
  const [projectName, setProjectName] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (projectName.trim()) {
      const newProject = {
        id: Date.now(),
        name: projectName.trim(),
        description: "Análisis de estrés hídrico",
        createdAt: new Date().toLocaleDateString()
      };
      onCreateProject(newProject);
      // Navigate to NewDashboard with project name
      history.push({
        pathname: "/new-dashboard",
        state: { projectName: newProject.name }
      });
    }
  }

  function handleBack() {
    history.push("/");
  }

  return (
    <div className="new-project">
      <header className="new-project-header">
        <div className="header-left">
          <div className="logo">
            <Droplets size={32} />
            <span>AquaPredict</span>
          </div>
        </div>
        <div className="header-right">
          <button className="btn-back" onClick={handleBack}>
            <ArrowLeft size={20} />
            Volver
          </button>
          <button className="btn-menu">
            <ArrowLeft size={20} style={{ transform: 'rotate(90deg)' }} />
          </button>
        </div>
      </header>

      <main className="new-project-main">
        <section className="new-project-section">
          <h1 className="page-title">Nuevo Proyecto</h1>
          <p className="page-description">
            Crea una carpeta para organizar tus dashboards
          </p>
          
          <div className="form-container">
            <div className="form-header">
              <div className="form-icon">
                <FolderPlus size={24} />
              </div>
              <h2 className="form-title">Datos del Proyecto</h2>
            </div>
            
            <form className="project-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="project-name" className="form-label">
                  Nombre del Proyecto *
                </label>
                <input
                  id="project-name"
                  type="text"
                  className="form-input"
                  placeholder="Ej: Análisis CDMX 2025"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="btn-create-project">
                Crear Proyecto
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
