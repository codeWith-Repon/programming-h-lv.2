import App from '@/App';
import { createBrowserRouter } from 'react-router';
import User from '@/pages/User';
import Tasks from '@/pages/Tasks';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <App />,
    Component: App,
    children: [
      {
        index: true,
        // path: 'tasks',
        Component: Tasks,
      },
      {
        path: 'tasks',
        Component: Tasks,
      },
      {
        path: 'users',
        Component: User,
      },
    ],
  },
]);

export default router;
