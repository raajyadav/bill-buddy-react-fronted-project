import React from "react";
import Signup from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from "./private/PrivateRoute";

const App = () => {
  const myRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/userdashboard",
          element: <PrivateRoute><UserDashboard/></PrivateRoute>,
        },
      ],
    },
  ]);
  return <RouterProvider router={myRoutes}></RouterProvider>;
};

export default App;
