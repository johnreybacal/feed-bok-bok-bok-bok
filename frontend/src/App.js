
import { Container } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './Admin';
import './App.css';
import FeedbackForm from './FeedbackForm';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SnackbarProvider maxSnack={5}>
        <div class="form-container">
          <Container maxWidth="sm">
            <FeedbackForm></FeedbackForm>
          </Container>
        </div>
      </SnackbarProvider>,
    },
    {
      path: "/admin",
      element: <SnackbarProvider maxSnack={3}>
        <Admin></Admin>
      </SnackbarProvider>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
