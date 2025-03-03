import { createBrowserRouter } from 'react-router-dom';
import App from './App';
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
    ],
  },
]);

export default router;
