import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Game from './game/Game';
import GameRoom from './game/GameRoom';
import UserProfile from './user/UserProfile';
import HandHistory from './handHistory/HandHistory';
import Hud from './user/Hud';
import Main from './login/Main';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/main',
        element: <Main />,
      },

      {
        path: '/game',
        element: <Game />,
      },
      {
        path: '/gameRoom',
        element: <GameRoom />,
      },
      {
        path: '/profile',
        element: <UserProfile />,
      },
      {
        path: '/handHistory',
        element: <HandHistory />,
      },
      {
        path: '/hud',
        element: <Hud />,
      },
    ],
  },
]);

export default router;
