import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Navbar from "./components/Common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword";
import Error from "./pages/Error"
import UpdatePasswords from "./pages/UpdatePasswords";
import VerfifyEmail from "./pages/VerfifyEmail";

function App() {
  return (
    <div className="flex flex-col bg-richblack-900 w-screen min-h-screen font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:token"
          element={
            <OpenRoute>
              <UpdatePasswords/>
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerfifyEmail/>
            </OpenRoute>
          }
        />

        
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
