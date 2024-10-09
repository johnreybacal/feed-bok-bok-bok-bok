
import { Container } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import './App.css';
import FeedbackForm from './FeedbackForm';

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Container maxWidth="sm">
        <FeedbackForm></FeedbackForm>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
