import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import LogIn from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Players from "../pages/Players";
import AddPlayer from "../pages/AddPlayer";
import UpdatePlayer from "../components/UpdatePlayer";

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
        element: <AddPlayer></AddPlayer>
      },
      {
        path: "updatePlayer/:id",
        element: <UpdatePlayer></UpdatePlayer>
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
