import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Join from "./login/Join";
import Login from "./login/Login";
import Start from "./Start";
import Game from "./game/Game";
import Play from "./game/Play";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Start />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/play",
        element: <Play />,
      },
    ],
  },
]);

export default router;
