import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Accounts from "../pages/Accounts/Accounts";
import AddAccount from "../pages/Accounts/AddAccount";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddProduct from "../pages/AddProduct/AddProduct";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/home", element: <Home /> },

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
      {
        path: "/products",
        element: <PrivateRoute><Products /></PrivateRoute>,
      },
      {
        path: "/add-product",
        element: <PrivateRoute><AddProduct /></PrivateRoute>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />
      },
      {
        path: "/add-product",
        element: <AddProduct />
      },
      {
        path: "/cart",
        element: <Cart />
      },
    ],
  },
]);

export default router;