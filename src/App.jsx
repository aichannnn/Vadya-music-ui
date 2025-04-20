import React from "react"
import { useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import WelcomePage from './components/WelcomePage'


const App = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <WelcomePage/> : <Navigate to={'/home'}/> }/>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/login" />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
