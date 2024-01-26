import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Join from "./login/Join";
import Login from "./login/Login";
import Start from "./Start";
import Game from "./game/Game";
import GameRoom from "./game/GameRoom";
import UserProfile from "./user/UserProfile";
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
        path: "/gameRoom",
        element: <GameRoom />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
]);

export default router;
