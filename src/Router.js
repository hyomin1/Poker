import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Game from './game/Game';
import GameRoom from './game/GameRoom';
import UserProfile from './user/UserProfile';
import HandHistory from './handHistory/HandHistory';
import Hud from './user/Hud';
import Main from './login/Main';
import NotFound from './pages/NotFound';
import AuthPage from './pages/AuthPage';
import DashBoard from './pages/DashBoard';
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
