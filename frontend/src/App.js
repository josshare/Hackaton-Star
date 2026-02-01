import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [projects, setProjects] = useState([]);

  function handleCreateProject() {
    const newProject = {
      id: Date.now(),
      name: `Proyecto ${projects.length + 1}`,
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
            onCreateProject={handleCreateProject}
            projects={projects}
            onLogout={handleLogout}
          />
        )} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
