import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Loading from "./pages/Loading";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import Myfile from "./pages/Myfile";
import Self from "./pages/Self";
import SendPage from "./pages/SendPage";
import "./styles/global.style.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Myfile />} />
      <Route path="/my-profile" element={<Myfile />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/self" element={<Self />} />
      <Route path="/send" element={<SendPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/myfile" element={<Myfile />} />
    </Routes>
  );
}

export default App;
