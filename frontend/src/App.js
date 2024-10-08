
import { Container } from '@mui/material';
import './App.css';
import FeedbackForm from './FeedbackForm';

function App() {
  return (
    <div class="background">
      <Container maxWidth="sm" sx={{ padding: 8 }}>
        <FeedbackForm></FeedbackForm>
      </Container>
    </div>
  );
}

export default App;
