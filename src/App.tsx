import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from "./components/unauthenticated/Login";
import Dashboard from "./components/authenticated/Dashboard";
import UsageLogs from "./components/authenticated/UsageLogs";
import Settings from "./components/authenticated/Settings";
import Devices from "./components/authenticated/Devices";
import ReserveDevice from "./components/authenticated/ReservationCreate";
import ReservationEdit from "./components/authenticated/ReservationEdit";
import AuthLayout from "./components/authenticated/AuthLayout";

const ProtectedRouteWithOutlet = () => {
  const loggedUser = localStorage.getItem("logged_user");
  return loggedUser ? <Outlet /> : <Navigate to="/login" replace />;
};

const AuthGuard = () => {
  const navigate = useNavigate();
  const loggedUser = localStorage.getItem("logged_user");

  useEffect(() => {
    // If not logged in and trying to access protected routes, redirect to login
    if (!loggedUser && window.location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }

    // Check if user is logged in and is on the login page
    if (loggedUser && window.location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }
  }, [loggedUser, navigate]);

  return null;
};

const LoginRedirect = () => {
  const loggedUser = localStorage.getItem("logged_user");
  return loggedUser ? <Navigate to="/dashboard" replace /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AuthGuard />
        <ProtectedRouteWithOutlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { path: "/", element: <Navigate to="/dashboard" /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "usagelogs", element: <UsageLogs /> },
          { path: "settings", element: <Settings /> },
          { path: "devices", element: <Devices /> },
          {
            path: "devices/reservation/create/:id",
            element: <ReserveDevice />,
          },
          {
            path: "devices/reservation/edit/:id",
            element: <ReservationEdit />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginRedirect />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
