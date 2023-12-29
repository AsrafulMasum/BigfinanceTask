import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import LogIn from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Players from "../pages/Players";
import AddPlayer from "../pages/AddPlayer";
import UpdatePlayer from "../components/UpdatePlayer";
import PrivateRoutes from "./PrivateRoutes";

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
        path: "addPlayer",
        element: <PrivateRoutes><AddPlayer></AddPlayer></PrivateRoutes>
      },
      {
        path: "updatePlayer/:id",
        element: <PrivateRoutes><UpdatePlayer></UpdatePlayer></PrivateRoutes>
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
