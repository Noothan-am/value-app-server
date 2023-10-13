import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Loading from "./pages/Loading";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import "./styles/global.style.scss";
import Myfile from "./pages/Myfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/myfile" element={<Myfile />} />
    </Routes>
  );
}

export default App;
