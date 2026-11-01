import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@layout';
import { Error, Main } from '@pages';

export const routerData = [{ id: 1, label: 'Чат', path: '/', element: <Main /> }];

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
