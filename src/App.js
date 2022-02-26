import React from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Class from "./components/Class/Class";
import Admin from "./components/Admin/Admin";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-submenu/dist/index.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/class" element={<Class />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
