import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import SignUp from "./components/sign-up";
import SignIn from "./components/sign-in";
import ForgotPassword from "./components/forgot-password";
import ResetPassword from "./components/reset-passwod";
import Bookmarks from "./components/bookmarks";
import { useState } from "react";
// import ProtectedRoute from "./components/protected-route";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />

      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/bookmarks"
          element={<Bookmarks searchQuery={searchQuery} />}
        />
      </Routes>
    </div>
  );
}

export default App;
