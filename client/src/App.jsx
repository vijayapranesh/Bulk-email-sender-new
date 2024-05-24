import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import EmailSender from "./components/EmailSender";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact Component={Navbar} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/reset-password/:token" Component={ResetPassword} />
        <Route path="/email-sender" Component={EmailSender} />
        <Route path="/logout" Component={Logout} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
