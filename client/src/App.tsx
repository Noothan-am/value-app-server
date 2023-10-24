import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Loading from "./pages/Loading";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import Myfile from "./pages/Myfile";
import SendPage from "./pages/SendPage";
import "./styles/global.style.css";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/my-profile/:userId" element={<Myfile />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/send/:id" element={<SendPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/my-page/:userId" element={<MyProfile />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
