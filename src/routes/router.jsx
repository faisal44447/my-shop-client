import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Accounts from "../pages/Accounts/Accounts";
import AddAccount from "../pages/Accounts/AddAccount";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },

      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
      },
      {
        path: "/accounts",
        element: <PrivateRoute><Accounts /></PrivateRoute>,
      },
      {
        path: "/add-account",
        element: <PrivateRoute><AddAccount /></PrivateRoute>,
      },
    ],
  },
]);

export default router;