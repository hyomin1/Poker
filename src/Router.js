import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Game from './game/Game';
import GameRoom from './game/GameRoom';
import UserProfile from './user/UserProfile';
import Hud from './user/Hud';
import NotFound from './pages/NotFound';
import AuthPage from './pages/AuthPage';
import DashBoard from './pages/DashBoard';
import Lobby from './pages/Lobby';
import Board from './pages/Board';
import HandHistory from './pages/HandHistory';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <AuthPage type='login' />,
      },
      {
        path: '/register',
        element: <AuthPage />,
      },
      {
        path: '/dashboard',
        element: <DashBoard />,
      },
      {
        path: '/lobby',
        element: <Lobby />,
      },
      {
        path: '/board/:boardId',
        element: <Board />,
      },
      {
        path: '/handHistory',
        element: <HandHistory />,
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
        path: '/hud',
        element: <Hud />,
      },
    ],
  },
]);

export default router;
