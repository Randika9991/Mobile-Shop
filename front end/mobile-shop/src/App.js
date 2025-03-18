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
import Item from "./pages/admin/Item/Item";
import ItemUser from "./pages/user/Item/Item";
import AddItem from "./pages/admin/Item/AddItem";
import UpdateItem from "./pages/admin/Item/UpdateItem";
import User from "./pages/admin/User/User";

import 'font-awesome/css/font-awesome.min.css';

function App() {
    useAuthToken();
    return (
      <Router>
          <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/*Admin*/}
              <Route element={<ProtectedRoute allowedRole="admin" />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/edit/profile" element={<AdminProfileEdit />} />
                  <Route path="/item/index" element={<Item />} />
                  <Route path="/item/add" element={<AddItem />} />
                  <Route path="/item/update/:id" element={<UpdateItem />} />
                  <Route path="/users" element={<User />} />
              </Route>

              {/*User*/}
              <Route element={<ProtectedRoute allowedRole="user" />}>
                  <Route path="/user/dashboard" element={<UserDashboard />} />
                  <Route path="/user/edit/profile" id element={<UserProfileEdit />} />

                  <Route path="/user/item/index" element={<ItemUser />} />

              </Route>

              <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
  );
}

export default App;
