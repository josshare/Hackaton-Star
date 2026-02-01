import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ArrowLeft, Droplets, Info } from "lucide-react";
import "./PredictionDashboard.css";

export default function PredictionDashboard() {
  const history = useHistory();
  const location = useLocation();
  
  // Get dashboard and project names from location state
  const dashboardName = location.state?.dashboardName || "Zona Centro CDMX";
  const projectName = location.state?.projectName || "hola";

  // Sample data for the chart
  const chartData = [
    { month: "Mar 2025", stress: 65, precipitation: 45, temperature: 16 },
    { month: "Abr 2025", stress: 78, precipitation: 38, temperature: 18 },
    { month: "May 2025", stress: 82, precipitation: 32, temperature: 20 },
    { month: "Jun 2025", stress: 71, precipitation: 55, temperature: 22 },
    { month: "Jul 2025", stress: 58, precipitation: 78, temperature: 21 },
    { month: "Ago 2025", stress: 22, precipitation: 118, temperature: 18 },
    { month: "Sep 2025", stress: 35, precipitation: 95, temperature: 17 },
    { month: "Oct 2025", stress: 48, precipitation: 62, temperature: 16 },
    { month: "Nov 2025", stress: 55, precipitation: 48, temperature: 15 }
  ];

  const [hoveredPoint, setHoveredPoint] = useState(null);

  function getStressColor(stress) {
    if (stress <= 25) return "#3b82f6"; // Blue - Bajo
    if (stress <= 50) return "#eab308"; // Yellow - Medio
    if (stress <= 75) return "#f97316"; // Orange - Alto
    return "#dc2626"; // Red - Crítico
  }

  function getStressCategory(stress) {
    if (stress <= 25) return "Bajo";
    if (stress <= 50) return "Medio";
    if (stress <= 75) return "Alto";
    return "Crítico";
  }

  function handleBack() {
    history.push("/");
  }

  // Calculate SVG path for the line
  const width = 800;
  const height = 400;
  const padding = 60;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const xScale = (index) => padding + (index / (chartData.length - 1)) * chartWidth;
  const yScale = (value) => padding + (1 - value / 100) * chartHeight;

  const pathData = chartData.map((point, index) => {
    const x = xScale(index);
    const y = yScale(point.stress);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="prediction-dashboard">
      <header className="prediction-dashboard-header">
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

      <main className="prediction-dashboard-main">
        <section className="dashboard-section">
          <div className="dashboard-header">
            <h1 className="page-title">Predicción de Estrés Hídrico</h1>
            <p className="page-description">
              Proyección a 9 meses basada en modelos climáticos
            </p>
          </div>

          <div className="legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#3b82f6" }}></div>
              <span>Bajo (0-25%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#eab308" }}></div>
              <span>Medio (26-50%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#f97316" }}></div>
              <span>Alto (51-75%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#dc2626" }}></div>
              <span>Crítico (76-100%)</span>
            </div>
          </div>

          <div className="chart-container">
            <svg width={width} height={height} className="chart">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(value => (
                <g key={value}>
                  <line
                    x1={padding}
                    y1={yScale(value)}
                    x2={width - padding}
                    y2={yScale(value)}
                    stroke="#e5e7eb"
                    strokeDasharray="2,2"
                  />
                  <text
                    x={padding - 10}
                    y={yScale(value) + 5}
                    textAnchor="end"
                    className="axis-label"
                  >
                    {value}%
                  </text>
                </g>
              ))}

              {/* Critical threshold line */}
              <line
                x1={padding}
                y1={yScale(75)}
                x2={width - padding}
                y2={yScale(75)}
                stroke="#dc2626"
                strokeDasharray="5,5"
                strokeWidth={2}
              />

              {/* Chart line */}
              <path
                d={pathData}
                fill="none"
                stroke="#6366f1"
                strokeWidth={3}
              />

              {/* Area fill */}
              <path
                d={pathData + ` L ${xScale(chartData.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`}
                fill="url(#gradient)"
                opacity={0.3}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#dbeafe" />
                </linearGradient>
              </defs>

              {/* Data points */}
              {chartData.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={xScale(index)}
                    cy={yScale(point.stress)}
                    r={6}
                    fill={getStressColor(point.stress)}
                    stroke="white"
                    strokeWidth={2}
                    className="chart-point"
                    onMouseEnter={() => setHoveredPoint({ ...point, index })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <text
                    x={xScale(index)}
                    y={height - padding + 20}
                    textAnchor="middle"
                    className="x-axis-label"
                  >
                    {point.month}
                  </text>
                </g>
              ))}

              {/* Tooltip */}
              {hoveredPoint && (
                <g className="tooltip">
                  <rect
                    x={xScale(hoveredPoint.index) + 10}
                    y={yScale(hoveredPoint.stress) - 60}
                    width={140}
                    height={80}
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    rx={4}
                  />
                  <text
                    x={xScale(hoveredPoint.index) + 70}
                    y={yScale(hoveredPoint.stress) - 40}
                    textAnchor="middle"
                    className="tooltip-title"
                  >
                    {hoveredPoint.month}
                  </text>
                  <text
                    x={xScale(hoveredPoint.index) + 15}
                    y={yScale(hoveredPoint.stress) - 20}
                    className="tooltip-text"
                  >
                    Estrés Hídrico: {hoveredPoint.stress}%
                  </text>
                  <text
                    x={xScale(hoveredPoint.index) + 15}
                    y={yScale(hoveredPoint.stress)}
                    className="tooltip-text"
                  >
                    Precipitación: {hoveredPoint.precipitation} mm
                  </text>
                  <text
                    x={xScale(hoveredPoint.index) + 15}
                    y={yScale(hoveredPoint.stress) + 20}
                    className="tooltip-text"
                  >
                    Temperatura: {hoveredPoint.temperature}°C
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="info-section">
            <div className="info-header">
              <Info size={24} />
              <h2>¿Cómo interpretar estos datos?</h2>
            </div>
            <p className="info-text">
              El índice de estrés hídrico combina factores como precipitación esperada, temperatura proyectada y demanda de agua. 
              Valores superiores al 75% indican condiciones críticas donde los captadores pluviales son esenciales.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
