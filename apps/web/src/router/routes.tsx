import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/Dashboard/Home'));
const Login = lazy(() => import('../pages/Login'));
const Error404 = lazy(() => import('../pages/Error404'));

const routes = [
   {
      path: '/',
      element: <Navigate to="/dashboard" />,
      layout: 'default',
   },
   {
      path: '/login',
      element: <Login />,
      layout: 'blank',
   },
   {
      path: '/dashboard',
      element: <Dashboard />,
      layout: 'default',
   },
   {
      path: '*',
      element: <Error404 />,
      layout: 'blank',
   },
];

export { routes };
