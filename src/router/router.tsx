import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@layout';
import { Error, Main } from '@pages';
import { Test } from '../pages/Test/Test.tsx';

export const routerData = [
  { id: 1, label: 'Главная', path: '/', element: <Main /> },
  { id: 2, label: 'Тест', path: '/test', element: <Test /> },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: routerData.map((item) => {
      return { path: item.path, element: item.element };
    }),
  },
  {
    path: '*',
    element: <Error />,
  },
]);
