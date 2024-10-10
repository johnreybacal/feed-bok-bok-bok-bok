
import { Container } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './Admin';
import './App.css';
import FeedbackForm from './FeedbackForm';


function App() {
  useEffect(() => {
    document.title = 'Feed-bok';
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SnackbarProvider maxSnack={5}>
        <div class="container">
          <Container maxWidth="sm">
            <FeedbackForm></FeedbackForm>
          </Container>
        </div>
      </SnackbarProvider>,
    },
    {
      path: "/admin",
      element: <SnackbarProvider maxSnack={3}>
        <div class="container">
          <Container>
            <Admin></Admin>
          </Container>
        </div>
      </SnackbarProvider>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
