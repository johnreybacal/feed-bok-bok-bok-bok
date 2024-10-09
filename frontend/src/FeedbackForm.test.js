// FeedbackForm.test.js
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import FeedbackForm from './FeedbackForm';

jest.mock('axios');

describe('FeedbackForm', () => {
    it('should render the form with initial state', () => {
        render(<FeedbackForm />);

        expect(screen.getByPlaceholderText('Your name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Your email')).toHaveValue('');
        expect(screen.getByPlaceholderText('What do you think?')).toHaveValue('');
        expect(screen.getByText("Submit")).not.toBeDisabled();
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
        expect(screen.getByText("Submit")).not.toBeDisabled();
    });

    it('should show validation errors on submit without input', async () => {
        render(<FeedbackForm />);
        const mockAxios = jest.mocked(axios);
        mockAxios.post.mockRejectedValueOnce({
            status: 400, data: [
                "name is a required field",
                "email is a required field",
                "feedback is a required field"
            ]
        });

        const submitButton = screen.getByText("Submit")
        fireEvent.click(submitButton);

        setTimeout(() => {
            expect(screen.getByText("name is a required field")).toBeInTheDocument();
            expect(screen.getByText("email is a required field")).toBeInTheDocument();
            expect(screen.getByText("feedback is a required field")).toBeInTheDocument();
        }, 100);
    });

});