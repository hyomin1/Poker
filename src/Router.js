import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Join from "./login/Join";
import Login from "./login/Login";
import Start from "./Start";
import GameMenu from "./game/GameMenu";
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
        element: <GameMenu />,
      },
    ],
  },
]);

export default router;
