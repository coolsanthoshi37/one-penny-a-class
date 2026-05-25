import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Payments from "./pages/Payments";
import FinancialAid from "./pages/FinancialAid";
import StudentsPage from "./pages/StudentsPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD ROUTES */}
      <Route
        element={
          user
            ? <DashboardLayout />
            : <Navigate to="/login" />
        }
      >
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/payments" element={<Payments />} />

        <Route path="/aid" element={<FinancialAid />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
  path="/students"
  element={
    <StudentsPage />
  }
/>
      </Route>

    </Routes>
  );
}

export default App;