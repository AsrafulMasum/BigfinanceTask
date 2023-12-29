import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import LogIn from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Players from "../pages/Players";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "players",
        element: <Players></Players>
      },
      {
        path: "logIn",
        element: <LogIn></LogIn>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default MainRoutes;
