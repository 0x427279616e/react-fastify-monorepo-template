import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Error404 = lazy(() => import('../pages/Error404'));
const PersonalInfoList = lazy(() => import('../pages/PersonalInfo'));
const PersonalInfoForm = lazy(() => import('../pages/PersonalInfo/form'));

const routes = [
   {
      path: '/',
      element: <Navigate to="/personal-info" />,
      layout: 'default',
   },
   {
      path: '/personal-info',
      element: <PersonalInfoList />,
      layout: 'default',
   },
   {
      path: '/personal-info/form',
      element: <PersonalInfoForm />,
      layout: 'default',
   },
   {
      path: '*',
      element: <Error404 />,
      layout: 'blank',
   },
];

export { routes };
