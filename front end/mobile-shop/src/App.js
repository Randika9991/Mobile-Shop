import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfileEdit from "./pages/profile/user/UserProfileEdit";
import {NotFound} from "./pages/NotFound";
import useAuthToken from "./hooks/useAuthToken";
import AdminProfileEdit from "./pages/profile/admin/AdminProfileEdit";

function App() {
    useAuthToken();
    return (
      <Router>
          <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute allowedRole="admin" />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/edit/profile" element={<AdminProfileEdit />} />
              </Route>

              <Route element={<ProtectedRoute allowedRole="user" />}>
                  <Route path="/user/dashboard" element={<UserDashboard />} />
                  <Route path="/user/edit/profile" element={<UserProfileEdit />} />
              </Route>

              <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
  );
}

export default App;
