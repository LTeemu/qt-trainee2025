import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/unauthenticated/Login";
import Dashboard from "./components/authenticated/Dashboard";
import UsageLogs from "./components/authenticated/UsageLogs";
import Settings from "./components/authenticated/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/authenticated/AuthLayout";
import Devices from "./components/authenticated/Devices";
import ReserveDevice from "./components/authenticated/ReservationCreate";
import ReservationEdit from "./components/authenticated/ReservationEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<AuthLayout />} />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "usagelogs", element: <UsageLogs /> },
      { path: "settings", element: <Settings /> },
      { path: "devices", element: <Devices /> },
      { path: "devices/reservation/create/:id", element: <ReserveDevice /> },
      { path: "devices/reservation/edit/:id", element: <ReservationEdit /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
