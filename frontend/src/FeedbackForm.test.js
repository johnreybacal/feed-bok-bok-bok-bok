// FeedbackForm.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    it('should update form state on input change', () => {
        render(<FeedbackForm />);

        const nameInput = screen.getByPlaceholderText('Your name');
        const emailInput = screen.getByPlaceholderText('Your email');
        const feedbackInput = screen.getByPlaceholderText('What do you think?');

        userEvent.type(nameInput, 'John Doe');
        userEvent.type(emailInput, 'john.doe@example.com');
        userEvent.type(feedbackInput, 'This is a great product!');

        expect(screen.getByPlaceholderText('Your name')).toHaveValue('John Doe');
        expect(screen.getByPlaceholderText('Your email')).toHaveValue('john.doe@example.com');
        expect(screen.getByPlaceholderText('What do you think?')).toHaveValue('This is a great product!');
        expect(screen.getByRole('button')).not.toBeDisabled();
    });

});