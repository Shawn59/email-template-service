import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { StyledEngineProvider } from '@mui/material';
import { SnackbarAtom } from './_atoms/Snackbar/Snackbar';

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <SnackbarAtom />

          <RouterProvider router={router} />
        </Provider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
