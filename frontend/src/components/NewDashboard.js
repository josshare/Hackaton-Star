import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ArrowLeft, Search, Filter, Droplets } from "lucide-react";
import "./NewDashboard.css";

export default function NewDashboard() {
  const [dashboardName, setDashboardName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [socialCategory, setSocialCategory] = useState("");
  const [homeSize, setHomeSize] = useState("");
  const history = useHistory();
  const location = useLocation();
  
  // Get project name from location state or use default
  const projectName = location.state?.projectName || "hola";

  function handleSubmit(e) {
    e.preventDefault();
    if (dashboardName.trim() && postalCode.trim()) {
      // Navigate to PredictionDashboard with dashboard and project names
      history.push({
        pathname: "/prediction-dashboard",
        state: { 
          dashboardName: dashboardName.trim(),
          projectName: projectName
        }
      });
    }
  }

  function handleBack() {
    history.push("/");
  }

  return (
    <div className="new-dashboard">
      <header className="new-dashboard-header">
        <div className="header-left">
          <div className="logo">
            <Droplets size={32} />
            <span>AquaPredict</span>
          </div>
        </div>
        <div className="header-right">
          <button className="btn-back" onClick={handleBack}>
            <ArrowLeft size={20} />
            {projectName}
          </button>
          <button className="btn-menu">
            <ArrowLeft size={20} style={{ transform: 'rotate(90deg)' }} />
          </button>
        </div>
      </header>

      <main className="new-dashboard-main">
        <section className="new-dashboard-section">
          <h1 className="page-title">Nuevo Dashboard</h1>
          <p className="page-description">
            Proyecto: {projectName}
          </p>
          
          <div className="form-container">
            <div className="form-header">
              <div className="form-icon">
                <Search size={24} />
              </div>
              <h2 className="form-title">Datos del Dashboard</h2>
            </div>
            
            <form className="dashboard-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="dashboard-name" className="form-label">
                  Nombre del Dashboard *
                </label>
                <input
                  id="dashboard-name"
                  type="text"
                  className="form-input"
                  placeholder="Ej: Zona Centro CDMX"
                  value={dashboardName}
                  onChange={(e) => setDashboardName(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="postal-code" className="form-label">
                  Código Postal *
                </label>
                <input
                  id="postal-code"
                  type="text"
                  className="form-input"
                  placeholder="Ej: 06600"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>

          <div className="form-container">
            <div className="form-header">
              <div className="form-icon">
                <Filter size={24} />
              </div>
              <div className="form-title-group">
                <h2 className="form-title">Filtros Avanzados</h2>
                <span className="form-subtitle">Opcional</span>
              </div>
            </div>
            
            <form className="filters-form" onSubmit={handleSubmit}>
              <div className="filter-group">
                <h3 className="filter-title">Categoría Social</h3>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="social-category"
                      value="interes-social"
                      checked={socialCategory === "interes-social"}
                      onChange={(e) => setSocialCategory(e.target.value)}
                    />
                    <span className="radio-text">Interés Social</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="social-category"
                      value="residencia-negocio"
                      checked={socialCategory === "residencia-negocio"}
                      onChange={(e) => setSocialCategory(e.target.value)}
                    />
                    <span className="radio-text">Residencia & Negocio</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="social-category"
                      value="casa-habitacion"
                      checked={socialCategory === "casa-habitacion"}
                      onChange={(e) => setSocialCategory(e.target.value)}
                    />
                    <span className="radio-text">Casa Habitación</span>
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <h3 className="filter-title">Tamaño de Vivienda</h3>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="home-size"
                      value="pequena"
                      checked={homeSize === "pequena"}
                      onChange={(e) => setHomeSize(e.target.value)}
                    />
                    <span className="radio-text">Pequeña (&lt;80m²)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="home-size"
                      value="mediana"
                      checked={homeSize === "mediana"}
                      onChange={(e) => setHomeSize(e.target.value)}
                    />
                    <span className="radio-text">Mediana (80-150m²)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="home-size"
                      value="grande"
                      checked={homeSize === "grande"}
                      onChange={(e) => setHomeSize(e.target.value)}
                    />
                    <span className="radio-text">Grande (&gt;150m²)</span>
                  </label>
                </div>
              </div>
              
              <button type="submit" className="btn-create-dashboard">
                Crear Dashboard
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
