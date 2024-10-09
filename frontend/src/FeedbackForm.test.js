// FeedbackForm.test.js
import { render, screen } from '@testing-library/react';
import FeedbackForm from './FeedbackForm';

jest.mock('axios');

describe('FeedbackForm', () => {
    it('should render the form with initial state', () => {
        render(<FeedbackForm />);

        expect(screen.getByPlaceholderText('Your name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Your email')).toHaveValue('');
        expect(screen.getByPlaceholderText('What do you think?')).toHaveValue('');
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(screen.getByRole('button')).not.toBeDisabled();
    });
});