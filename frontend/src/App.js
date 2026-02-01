import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewProject from "./components/NewProject";
import NewDashboard from "./components/NewDashboard";

function App() {
  const [projects, setProjects] = useState([]);

  function handleCreateProject(projectData) {
    const newProject = {
      id: Date.now(),
      name: projectData.name || `Proyecto ${projects.length + 1}`,
      description: "Análisis de estrés hídrico",
      createdAt: new Date().toLocaleDateString()
    };
    setProjects([...projects, newProject]);
  }

  function handleLogout() {
    // Simulate logout - redirect to login
    window.location.href = "/login";
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => (
          <Dashboard 
            onCreateProject={() => {/* Navigate handled by Dashboard */}}
            projects={projects}
            onLogout={handleLogout}
          />
        )} />
        <Route path="/new-project" render={() => (
          <NewProject onCreateProject={handleCreateProject} />
        )} />
        <Route path="/new-dashboard" component={NewDashboard} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
